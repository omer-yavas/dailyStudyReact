import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

export default function NestedList() {
  const navigate = useNavigate();

  const [allStates, setAllStates] = React.useState({
    sectionTableOpen: false,
    inboxOpen: false,
    menuOpen: false,
  });

  const handleCollapseClick = (arg) => {
    const loader = { ...allStates };
    for (const prop in loader) {
      loader[prop] = false;
    }
    setAllStates({ ...loader, ...arg });
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => navigate('/order')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sipariş Takip" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/bill')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Adisyon işlemleri" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/valet')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Vale Yönetim" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleCollapseClick({ menuOpen: !allStates.menuOpen })}
      >
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Menü Yönetim" />
        {allStates.menuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={allStates.menuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/seeItems')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Ürünler" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/editItems')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>
              {' '}
              Ürün Oluştur<br></br> / Düzenle
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate('/editItemCategories')}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Ürün Kategorileri" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/editMenu')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>
              Menü Oluştur <br></br> / Düzenle
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate('/editMenuCategories')}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Menü Kategorileri" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/test')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Test" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => navigate('/system')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Kullanıcı Yetkilendirme" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/reports')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Raporlar" />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          handleCollapseClick({ sectionTableOpen: !allStates.sectionTableOpen })
        }
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText>
          Bölüm-Masa<br></br>Personel
        </ListItemText>
        {allStates.sectionTableOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={allStates.sectionTableOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate('/defineSectionTable')}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Bölüm-Masa" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => navigate('/definePersonel')}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Personel" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
