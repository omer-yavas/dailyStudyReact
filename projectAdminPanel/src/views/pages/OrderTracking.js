import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { Button as BootstrapButton } from "react-bootstrap";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  useFetchOrdersQuery,
  useDeleteOrderMutation,
} from "src/features/OrderApi";
import { useFetchTablesQuery } from "src/features/RestaurantLayoutApi";
import { useFetchUsersQuery } from "src/features/UserApi";
import Swal from "sweetalert2";
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
            // "orderID",
            "tableID",
            "customerID",
            "orderTime",
            "orderIngredients",
            "orderPrice",
          ],
          hideToolbar: true,
          hideFooter: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const OrderTracking = () => {
  const navigate = useNavigate();

  //--------------Siparişleri çekmek için
  const { data: ordersData, isLoading, isError } = useFetchOrdersQuery();

  //--------Sipariş silmek için
  const [
    deleteOrder,
    {
      isLoading: isDeleting,
      isError: isDeletingError,
      isSuccess: isDeletingSuccess,
    },
  ] = useDeleteOrderMutation();

  const deleteOrderHandler = (id) => {
    Swal.fire({
      title: "Sipariş iptal edilecek",
      text: "Emin misin?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Hayır",
      confirmButtonText: "Evet, iptal et!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder([`${id}`]);
      }
    });
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

  //----------Siparişlere, zaman sırasına göre sıra no veren fonksiyon
  const timeBasedNumberGenerator = (orderId) => {
    const allOrder = [...ordersData.data];
    allOrder.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    const result = allOrder.findIndex((element) => element.id === orderId);
    return result + 1;
  };

  //-------tables id sine karşılık table name veren fonk
  const tableConverter = (id) => {
    const theTable = currentTables.find((element) => {
      return element.id === id;
    });
    if (theTable) {
      return theTable.name;
    }
  };

  //---------zaman datasından saati çıkarmak için
  // const timeConverter(time){
  // }

  //--------sipariş içeriklerini görüntülemek için  name ve count propları yollayan func
  const orderView = (arr) => {
    const justNames = arr.map((orderItem) => orderItem.name);

    const objArr = [];
    for (let i = 0; i < justNames.length; i++) {
      if (objArr.some((element) => element.name === justNames[i])) {
        let idx = objArr.findIndex(({ name, count }) => name === justNames[i]);
        objArr[idx].count++;
      } else {
        objArr.push({ name: justNames[i], count: 1 });
      }
    }

    return objArr;
  };

  const columns = [
    {
      field: "orderID",
      headerName: "Sipariş No",
      headerClassName: "column-header-style",
      minWidth: 40,
    },
    {
      field: "tableID",
      headerName: "Masa No",
      headerClassName: "column-header-style",
      minWidth: 70,
    },
    {
      field: "customerID",
      headerName: "Müşteri",
      headerClassName: "column-header-style",
      minWidth: 160,
    },
    // {
    //   field: "orderTime",
    //   headerName: "Zamanı",
    //   headerClassName: "column-header-style",
    //   minWidth: 120,
    // },
    {
      field: "orderIngredients",
      headerName: "İçerik",
      headerClassName: "column-header-style",
      minWidth: 250,
      renderCell: (params) => {
        for (let i = 0; i < params.row.orderIngredients.length; i++) {
          return (
            <div>
              {params.row.orderIngredients[i].name}
              {"x"}
              {params.row.orderIngredients[i].count}
            </div>
          );
        }
      },
    },

    {
      field: "orderPrice",
      headerName: "Tutar",
      headerClassName: "column-header-style",
      minWidth: 70,
    },
    {
      field: "cancel",
      headerName: "İptal Et",
      headerClassName: "column-header-style",
      minWidth: 80,
      renderCell: (params) => {
        return (
          <div onClick={() => deleteOrderHandler([params.row.id])}>
            <CancelIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "edit",
      headerName: "Düzenle",
      headerClassName: "column-header-style",
      minWidth: 80,
      renderCell: (params) => {
        return (
          <div>
            <EditIcon />
          </div>
        );
      },
      sortable: false,
      filterable: false,
    },
  ];

  let rows = [];
  if (ordersData) {
    rows = ordersData.data.map((item) => {
      return {
        id: item.id,
        orderID: timeBasedNumberGenerator(item.id),
        tableID: tableConverter(item.tableId),
        customerID: nameConverter(item.customerId),
        orderIngredients: orderView(item.orderedItems),
        orderPrice: item.amount,
      };
    });
  }

  return (
    <div>
      <div className="add_newOrder_button">
        <BootstrapButton onClick={() => navigate("/addNewOrder")}>
          Yeni Sipariş Oluştur!
        </BootstrapButton>
      </div>

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
          getRowHeight={() => "auto"}
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
      </div>
    </div>
  );
};

export default OrderTracking;
