import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
//grid için
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import {
  useFetchReceiptsQuery,
  useDeleteReceiptMutation,
} from "src/features/ReceiptApi";
import { useFetchTablesQuery } from "src/features/RestaurantLayoutApi";
import { useFetchUsersQuery } from "src/features/UserApi";
import {
  changeMasterReceipt,
  changeMasterReceiptOwner,
  changeMasterReceiptTable,
  uploadToStandAlonePaymentGroups,
} from "src/features/user/ReceiptSlice";

const ODD_OPACITY = 0.2;

const theme = createTheme({
  palette: {
    primary: {
      main: "#5f9ea0",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: alpha("#796a51", 0.3),
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton></GridToolbarColumnsButton>
      <GridToolbarFilterButton></GridToolbarFilterButton>
      <GridToolbarDensitySelector></GridToolbarDensitySelector>
      <GridToolbarExport
        csvOptions={{ disableToolbarButton: true }}
        printOptions={{
          fields: [
            "receiptID",
            "tableID",
            "customerID",
            "receiptPrice",
            "allPrice",
            "paymentStatus",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const ReceiptManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //-----modalların açma kapaması için state ler
  const [showModal, setShowModal] = useState(false);
  const [showSharePayment, setShowSharePayment] = useState(false);
  //-----Ödeme birleştirme ekranı state leri
  const [masterCustomer, setMasterCustomer] = useState("");
  const [masterCustomerTable, setMasterCustomerTable] = useState("");
  const [otherReceiptsInMasterTable, setOtherReceiptsInMasterTable] = useState(
    []
  );
  const [selectedTablesToPay, setSelectedTablesToPay] = useState([]);
  const [selectedReceipts, setSelectedReceipts] = useState([]);
  const [grandTotalOfSharing, setGrandTotalOfSharing] = useState(0);
  const [payerIds, setPayerIds] = useState([]);
  const [payerShares, setPayerShares] = useState([]);

  //--------------Adisyonları çekmek için
  const { data: receiptsData, isLoading, isError } = useFetchReceiptsQuery();

  //Adisyon silmek için
  const [deleteReceipt] = useDeleteReceiptMutation();
  //masaları seçebilmek için
  const {
    data: tablesData,
    isLoading: tablesLoading,
    isError: tablesError,
  } = useFetchTablesQuery();

  //--------Tables Fetch ediliyor
  const listTables = () => {
    let tables = [];
    tablesData.data.map((item) => {
      tables.push({ name: item.tableName, id: item.id });
    });
    return tables;
  };

  const currentTables = tablesData ? listTables() : [];

  //-------tables id sine karşılık table name veren fonk
  const tableConverter = (id) => {
    const theTable = currentTables.find((element) => {
      return element.id === id;
    });
    if (theTable) {
      return theTable.name;
    }
  };

  //----------Adisyonlara, o ay içindeki sırasına göre sıra no veren fonksiyon
  const timeBasedNumberGenerator = (receiptId) => {
    const allReceipt = [...receiptsData.data];
    allReceipt.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    const result = allReceipt.findIndex((element) => element.id === receiptId);
    return result + 1;
  };

  //kullanıcıları al
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetchUsersQuery();

  //-----------customer id yi isme çeviren fonksiyon
  function nameConverter(id) {
    if (usersData && usersData.data.length > 0) {
      const result = usersData.data.find((element) => element.id === id);
      if (result) {
        const { name } = result;
        return name;
      }
    }

    return `not converted${id}`;
  }

  //-------------birleştir butonuna basıldığında yapılacak işlemler
  const combinePaymentHandler = (params) => {
    setSelectedTablesToPay([]);
    setMasterCustomer({
      id: params.customerID,
      name: nameConverter(params.customerID),
    });
    setMasterCustomerTable(params.tableID);
    //masadaki diğer adisyonları bulmak için
    const shallowCopyOfReceipts = receiptsData.data
      .filter((receipt) => receipt.tableId === params.tableID)
      .filter((receipt) => receipt.id !== params.receiptID);
    const otherReceiptsInTable = [...shallowCopyOfReceipts];

    setOtherReceiptsInMasterTable(otherReceiptsInTable);

    setShowModal(true);
  };

  //-----------seçilen adisyonların inputlarını işaretleyen fonk
  const handleCheckboxChange = (event, receipt) => {
    if (event.target.checked) {
      setSelectedReceipts((prevSelectedReceipts) => [
        ...prevSelectedReceipts,
        receipt,
      ]);
    } else {
      setSelectedReceipts((prevSelectedReceipts) =>
        prevSelectedReceipts.filter(
          (selectedReceipt) => selectedReceipt.id !== receipt.id
        )
      );
    }
  };

  //----------Ödeme birleştirme ekranında ödenecek masaları eklemek  için kullanılan fonksiyon
  const tableSelectionHandler = (id) => {
    if (id !== "" && !selectedTablesToPay.includes(id))
      setSelectedTablesToPay([...selectedTablesToPay, id]);
  };

  //--------Ödeme birleştirme ekranında ödenecek masaları iptal  için kullanılan fonksiyon
  const tableCancelHandler = (id) => {
    const newTables = selectedTablesToPay.filter((table) => table !== id);
    setSelectedTablesToPay(newTables);
  };

  //-----ödeme birleştirme ekranında Tek başına ödeme butonu için
  const standAlonePaymentHandler = () => {
    //hiçbir seçim yapılmadı ise ikaz ver
    if ((selectedTablesToPay.length === 0) & (selectedReceipts.length === 0)) {
      return Swal.fire({
        icon: "error",
        title: "Dikkat!",
        text: "Masa veya adisyon seçmelisin!",
      });
    } else {
      //seçim yapıldı ise seçilen table daki receipt ID leri bir array e diz
      let receiptFromOtherTable = [];
      selectedTablesToPay.map((table) => {
        const result = receiptsData.data.filter(
          (receipt) => receipt.tableId === table
        );
        receiptFromOtherTable = receiptFromOtherTable.concat([...result]);
      });
      //
      //seçilen tüm receiptleri slave olarak, ödeme yapanı ise master olarak yolla
      dispatch(
        uploadToStandAlonePaymentGroups({
          masterReceipt: receiptsData.data.find(
            (receipt) => receipt.customerId === masterCustomer.id
          ),
          slaveReceipt: [...selectedReceipts].concat([
            ...receiptFromOtherTable,
          ]),
        })
      );
      Swal.fire("Harika!", "Tek Başına Ödeme Kaydedildi!", "success");
      handleClose();
    }
  };

  //------------------------------------------------
  const handleClose = () => {
    handleCancelAllProcess();
  };
  const handleShow = () => setShowModal(true);

  const handleClickSharePayment = () => {
    //ortak adisyon seçilmedi ise ikaz ver!
    if (selectedReceipts.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Dikkat!",
        text: "Paylaştırarak ödeme için diğer adisyonlardan eklemelisin!",
      });
    } else {
      //seçilen masalardaki adisyonları listele
      const receiptsInOtherTables = receiptsData.data.filter((receipt) =>
        selectedTablesToPay.includes(receipt.tableId)
      );

      //seçilen adisyonları listele
      const receiptsOfPayers = [...selectedReceipts].concat(
        receiptsData.data.filter(
          (receipt) => receipt.customerId === masterCustomer.id
        )
      );
      const allReceipts = receiptsInOtherTables.concat([...receiptsOfPayers]);

      //ikisinim ödeme tutarlarını topla, state e at
      const calculateGrandTotalOfSharing = () => {
        let total = 0;
        allReceipts.map((receipt) => (total = total + receipt.amount));
        return total;
      };
      setGrandTotalOfSharing(calculateGrandTotalOfSharing());

      //şimdi ödeme yapacak müşterileri listeleyelim ve state e atalım
      //üst satırda receiptsOfPayers dan çıkarabiliriz=> master + payers
      const payers = receiptsOfPayers.map((receipt) => receipt.customerId);
      setPayerIds(payers);

      //ödeme yapacak müşteriler sayısınca {id:...,share:...} nesnesi oluşturup array e koyalım
      const sharePlan = [];
      payers.map((id) => sharePlan.push({ id: id, share: 0 }));
      setPayerShares(sharePlan);

      setShowModal(false);
      setShowSharePayment(true);
    }
  };

  const handleCancelAllProcess = () => {
    setSelectedTablesToPay([]);
    setGrandTotalOfSharing(0);
    setPayerIds([]);
    setSelectedReceipts([]);
    setShowModal(false);
    setShowSharePayment(false);
    setMasterCustomer("");
    setMasterCustomerTable("");
    setOtherReceiptsInMasterTable([]);
    setPayerShares([]);
  };

  //paylaşım onaylandığında handle edilecek fonksiyon
  const approvePaymentSharePlan = () => {
    //grandtotal ile müşteri paylarının toplamının eşit olup olmadığına bakıyoruz,yanlişlık varsa ikaz geçiyoruz
    let payerSharesTotal = 0;
    payerShares.map(
      (customer) =>
        (payerSharesTotal = payerSharesTotal + Number(customer.share))
    );

    if (payerSharesTotal !== grandTotalOfSharing) {
      return Swal.fire({
        icon: "error",
        title: "Dikkat!",
        text: "Paylaşım Doğru Yapılamadı!",
      });
    } else {
      //paylaşım doğru ise paydaş adisyonların combinedReceipts key ini API den update ediyoruz
    }
  };

  //paylaşımlı ödeme yapacak müşterilerin paylarının girildiği input ları yöneten fonk.
  const payerShareInputHandler = (id, e) => {
    const newPayerShare = [...payerShares];

    for (let i = 0; i < newPayerShare.length; i++) {
      if (newPayerShare[i].id === id) {
        newPayerShare[i].share = e.target.value;
        break; // İstenilen ID'ye sahip nesne bulunduğunda döngüyü sonlandırın
      }
    }
    setPayerShares(newPayerShare);
  };

  console.log(payerShares);

  const columns = [
    {
      field: "receiptID",
      headerName: "Adisyon",
      headerClassName: "column-header-style",
      minWidth: 65,
      renderCell: (params) => {
        return timeBasedNumberGenerator(params.row.receiptID);
      },
    },
    {
      field: "tableID",
      headerName: "Masa",
      headerClassName: "column-header-style",
      minWidth: 100,
      renderCell: (params) => {
        return tableConverter(params.row.tableID);
      },
    },
    {
      field: "customerID",
      headerName: "Müşteri",
      headerClassName: "column-header-style",
      minWidth: 170,
      renderCell: (params) => {
        return nameConverter(params.row.customerID);
      },
    },
    {
      field: "showReceipt",
      headerName: "Görüntüle",
      headerClassName: "column-header-style",
      minWidth: 70,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              dispatch(changeMasterReceipt(params.row.receiptID));
              dispatch(
                changeMasterReceiptOwner(nameConverter(params.row.customerID))
              );
              dispatch(
                changeMasterReceiptTable(tableConverter(params.row.tableID))
              );
              navigate("/receiptPayment");
            }}
          >
            <ReceiptLongOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "writeReceipt",
      headerName: "Yazdır",
      headerClassName: "column-header-style",
      minWidth: 70,
      renderCell: (params) => {
        return (
          <div>
            <LocalPrintshopOutlinedIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "addReceipt",
      headerName: "Birleştir",
      headerClassName: "column-header-style",
      minWidth: 120,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="contained"
              onClick={() => combinePaymentHandler(params.row)}
            >
              <AddOutlinedIcon />
            </Button>
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "receiptPrice",
      headerName: "Adisyon Tutarı",
      headerClassName: "column-header-style",
      minWidth: 120,
    },
    {
      field: "allPrice",
      headerName: "Toplam Tutar",
      headerClassName: "column-header-style",
      minWidth: 110,
    },
    {
      field: "delete",
      header: "delete",
      headerClassName: "column-header-style",
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Button onClick={() => deleteReceipt([params.row.receiptID])}>
            {"Sil"}
          </Button>
        );
      },
    },
    // {
    //   field: "paymentStatus",
    //   headerName: "Ödeme Al",
    //   headerClassName: "column-header-style",
    //   minWidth: 170,
    // },
  ];

  let rows = [];
  if (receiptsData) {
    rows = receiptsData.data.map((item) => {
      return {
        id: item.id,
        receiptID: item.id,
        tableID: item.tableId,
        customerID: item.customerId,
        orders: item.orderedItems,
        receiptPrice: item.amount,
        //paymentStatus: "Bekliyor",
        allPrice: 100,
        delete: item.id,
      };
    });
  }

  return (
    <div>
      <StripedDataGrid
        sx={{
          ".MuiDataGrid-cell": {
            border: "1px solid #000",
          },
          ".MuiDataGrid-columnHeader": {
            border: "1px solid #000",
          },
          ".MuiDataGrid-main": {
            border: "1px solid #000",
          },
        }}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        localeText={{
          toolbarColumns: "Tablo Başlıkları",
          toolbarFilters: "Filtrele",
          toolbarDensity: "Satır Aralığı",
          toolbarDensityCompact: "Dar",
          toolbarDensityStandard: "Orta",
          toolbarDensityComfortable: "Geniş",
          toolbarExport: "Yazdır",
          toolbarExportCSV: "CSV olarak İndir",
          toolbarExportPrint: "Yazdır",
        }}
        slots={{ toolbar: CustomToolbar }}
      />
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ödeme Ekleme / Birleştirme </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Müşteri : {masterCustomer.name}</h4>
          <h5>Masa : {tableConverter(masterCustomerTable)}</h5>
          {otherReceiptsInMasterTable.length > 0 ? (
            <fieldset>
              <legend>Masadaki Diğer Adisyonları Ekle</legend>
              {otherReceiptsInMasterTable.map((receipt, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={selectedReceipts.some(
                        (selectedReceipt) => selectedReceipt.id === receipt.id
                      )}
                      onChange={(event) => handleCheckboxChange(event, receipt)}
                    />
                    <label>{nameConverter(receipt.customerId)}</label>
                  </div>
                );
              })}
            </fieldset>
          ) : null}

          <fieldset>
            <legend> Diğer Masaları Ekle</legend>

            <label for="table-select">Masa Seçiniz:</label>

            <select
              id="table-select"
              onChange={(event) => tableSelectionHandler(event.target.value)}
            >
              <option value="">--Lütfen Masa Seçiniz--</option>
              {currentTables.map((table) => {
                if (masterCustomerTable !== table.id) {
                  return <option value={table.id}>{table.name}</option>;
                }
              })}
            </select>
            <div>
              <p>Eklenen Masalar</p>
              {selectedTablesToPay.map((tableId) => {
                return (
                  <div>
                    <div>{tableConverter(tableId)}</div>
                    <CancelIcon onClick={() => tableCancelHandler(tableId)} />
                  </div>
                );
              })}
              <div></div>
            </div>
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={standAlonePaymentHandler}>Tek Başına Öde</Button>
          <Button onClick={handleClickSharePayment}>Paylaştırarak Öde</Button>
          <Button onClick={handleCancelAllProcess}>İptal</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSharePayment}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Paylaşımlı Ödeme Planı </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Toplam Ödeme Tutarı: {grandTotalOfSharing} TL</p>
          {/* <Button>Eşit Paylaştır</Button> */}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Müşteri</th>
                <th>Ödenecek Tutar</th>
              </tr>
            </thead>
            <tbody>
              {payerIds.map((id, index) => {
                return (
                  <tr key={index}>
                    <td>{nameConverter(id)}</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        onChange={(e) => payerShareInputHandler(id, e)}
                      ></input>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              approvePaymentSharePlan();
            }}
          >
            Ödeme Planını Onayla
          </Button>
          <Button onClick={handleCancelAllProcess}>İptal</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ReceiptManagement;
