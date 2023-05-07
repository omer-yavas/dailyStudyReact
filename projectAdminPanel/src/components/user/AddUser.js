import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/user/UserSlice';

const AddUser = () => {
  const dispatch = useDispatch();

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPassword, setUserPassword] = useState('12345');
  const [showPassword, setShowPassword] = useState(false);

  const handleUserUpload = () => {
    if (username.length < 3) {
      return alert('Kullanıcı Adı En Az 3 Harften Oluşmalı');
    }
    if (userRole === '') {
      return alert('Kullanıcı Rolü Seçiniz!');
    }

    dispatch(
      addUser({
        username: username,
        password: userPassword,
        role: userRole,
      })
    );
    setUsername('');
    setUserRole('');
    setUserPassword('12345');
  };

  const handleCancelClick = () => {
    setUsername('');
    setUserRole('');
    setUserPassword('12345');
    setAddUserOpen(false);
  };

  return (
    <div>
      <Button
        variant="primary"
        style={{ marginBottom: '1rem' }}
        onClick={() => setAddUserOpen(!addUserOpen)}
      >
        Yeni Kullanıcı Ekle
      </Button>
      {addUserOpen ? (
        <Container>
          <Row>
            <Col md={8} lg={6}>
              <Form.Group>
                <Form.Label>Kullanıcı Rolü Seçin</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option>----Rol Seçiniz----</option>
                  <option value="admin">Yönetici</option>
                  <option value="user">Görevli</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kullanıcı Adı</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Şifre</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="buttons_box">
                <Button variant="primary" onClick={handleUserUpload}>
                  Kaydet
                </Button>
                <Button variant="warning" onClick={handleCancelClick}>
                  İptal
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default AddUser;
