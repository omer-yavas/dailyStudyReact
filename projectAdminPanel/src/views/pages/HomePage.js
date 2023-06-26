import * as React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage_container">
      <div className="statistics_section">
        <div className="statistics_card">
          <div className="statistics_card_title">59.212 TL</div>
          <div className="statistics_card_text">Günlük Toplam Satış</div>
        </div>

        <div className="statistics_card">
          <div className="statistics_card_title">223</div>
          <div className="statistics_card_text">Sipariş Sayısı</div>
        </div>

        <div className="statistics_card">
          <div className="statistics_card_title">114</div>
          <div className="statistics_card_text">Servise Hazır Ürün Sayısı</div>
        </div>
      </div>
      <div className="card_section">
        <div className="nav_card" onClick={() => navigate("/orderTracking")}>
          Siparişler
        </div>
        <div className="nav_card" onClick={() => navigate("/receipt")}>
          Adisyon
        </div>
        <div className="nav_card" onClick={() => navigate("/menu")}>
          Menu
        </div>
        <div className="nav_card" onClick={() => navigate("/reports")}>
          Raporlar
        </div>
        <div className="nav_card" onClick={() => navigate("/valet")}>
          Vale
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <Card className="nav_card">
          <Card.Body>
            <Card.Img variant="top" src={OrderPhoto} />
            <Card.Title>Siparişler</Card.Title>
          </Card.Body>
        </Card>

        <Card className="nav_card">
          <Card.Body>
            <Card.Img variant="top" src={ReceiptPhoto} />
            <Card.Title>Adisyon</Card.Title>
          </Card.Body>
        </Card>

        <Card className="nav_card">
          <Card.Body>
            <Card.Img variant="top" src={MenuPhoto} />
            <Card.Title>Menu</Card.Title>
          </Card.Body>
        </Card>

        <Card className="nav_card">
          <Card.Body>
            <Card.Img variant="top" src={ReportsPhoto} />
            <Card.Title>Raporlar</Card.Title>
          </Card.Body>
        </Card>

        <Card className="nav_card">
          <Card.Body>
            <Card.Img variant="top" src={ValetPhoto} />
            <Card.Title>Vale</Card.Title>
          </Card.Body>
        </Card> */
}
