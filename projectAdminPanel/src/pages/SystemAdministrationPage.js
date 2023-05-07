import DeleteResetUser from '../components/user/DeleteResetUser';
import AddUser from '../components/user/AddUser';

const SystemAdministrationPage = () => {
  return (
    <div>
      <h3 className="page_header">Kullanıcı Hesap Yönetim Sayfası</h3>
      <DeleteResetUser />
      <AddUser />
    </div>
  );
};

export default SystemAdministrationPage;
