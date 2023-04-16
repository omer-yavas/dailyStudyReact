import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NavMaster = () => {
  const navigate = useNavigate();
  return (
    <div className="navbox">
      <Button variant="warning" onClick={() => navigate('/order')}>
        Sipariş Takip Sayfası
      </Button>{' '}
      <Button variant="warning" onClick={() => navigate('/bill')}>
        Adisyon işlemleri Sayfası
      </Button>{' '}
      <Button variant="warning" onClick={() => navigate('/valet')}>
        Vale Yönetim Sayfası
      </Button>{' '}
      <Button variant="warning" onClick={() => navigate('/menu')}>
        Menü Yönetim Sayfası
      </Button>{' '}
      <Button variant="warning" onClick={() => navigate('/system')}>
        Kullanıcı Yetkilendirme Sayfası
      </Button>
      <Button variant="warning" onClick={() => navigate('/reports')}>
        Raporlar Sayfası
      </Button>
      <Button variant="warning" onClick={() => navigate('/definement')}>
        Bölüm / masa / personel / indirim-limit tanımlama Sayfası
      </Button>
    </div>
  );
};

export default NavMaster;
