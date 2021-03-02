import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Route, Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PastOrders from "../../components/PastOrders/PastOrders";
import MyProfile from '../../components/MyProfile/MyProfile'
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// import SvgIcon from "@material-ui/icons/ShoppingBasket";
import PersonIcon from "@material-ui/icons/Person";
import NavAppBar from '../../components/Navbar/Navbar';
import FooterGrid from "../../components/Footer/Footer";
import { decodeToken }  from "../../services/authUser";
import { useStyles } from './ProfileSectionPage.style';
 
export default function ProfileSection() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  var token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <NavAppBar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} lg={4} md={4}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                  >
                    <Tab
                      className={classes.tabtext}
                      classes={{
                        wrapper: classes.iconLabelWrapper,
                        labelContainer: classes.labelContainer,
                      }}
                      icon={<PersonIcon />}
                      label="Profile"
                    />
                    {decodedToken.role == "DE" ? (
                      <Tab
                        className={classes.tabtext}
                        classes={{
                          wrapper: classes.iconLabelWrapper,
                          labelContainer: classes.labelContainer,
                        }}
                        icon={<ShoppingBasketIcon />}
                        label="Completed Orders"
                      />
                    ) : (
                      <Tab
                        className={classes.tabtext}
                        classes={{
                          wrapper: classes.iconLabelWrapper,
                          labelContainer: classes.labelContainer,
                        }}
                        icon={<ShoppingBasketIcon />}
                        label="Past Orders"
                      />
                    )}
                  </Tabs>
                </Grid>

                <Grid item sm={12} xs={12} lg={8} md={8}>
                  {selectedTab === 0 && <MyProfile />}
                  {selectedTab === 1 && <PastOrders />}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <FooterGrid />
    </div>
  );
}

