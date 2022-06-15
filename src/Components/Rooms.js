import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Button from "@material-ui/core/Button";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { TiUserDeleteOutline } from 'react-icons/ti'
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { IoMdAddCircle, IoMdChatboxes, IoMdChatbubbles } from "react-icons/io";
import { FcPlus, FcPortraitMode } from 'react-icons/fc'
import { CgUserList } from "react-icons/cg"
import { IoPeopleCircleOutline } from 'react-icons/io5'
import { IoIosPeople } from 'react-icons/io'
import { BiHash } from "react-icons/bi";
import CreateRoom from "./CreateRoom";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#cb43fc",
  },
  primary: {
    color: "gray",
  },
}));

function Rooms() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [channelList, setChannelList] = useState([]);
  const [channelDelete, setchanneltoDelete] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const history = useHistory();
  const [alert, setAlert] = useState(false);
  const channelId = useParams().id;

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannelList(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  // const handleDelete = () => {
  //   db.collection("channels")
  //     .doc(channelId)
  //     .delete()
  //     .then((res) => {
  //       console.log("deleted successfully");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (id) => {
    history.push(`/channel/${id}`);
  };

  const manageCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const addChannel = (cName) => {
    if (cName) {
      cName = cName.toLowerCase().trim();
      if (cName === "") {
        handleAlert();
        return;
      }

      for (var i = 0; i < channelList.length; i++) {
        if (cName === channelList[i].channelName) {
          handleAlert();
          return;
        }
      }

      db.collection("channels")
        .add({ channelName: cName.toLowerCase() })
        .then((res) => {
          console.log("added new channel");
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="Room Name Already Exits!!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      {showCreateRoom ? (
        <CreateRoom create={addChannel} manage={manageCreateRoomModal} />
      ) : null}
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Create New Channel" />
        <IconButton edge="end" aria-label="add" onClick={manageCreateRoomModal}>
          <AddIcon className={classes.primary} />
        </IconButton>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IoIosPeople style={{ fontSize: "1.5em", color: open ? "#8e9297" : 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Channels" style={{ color: open ? "#8e9297" : 'white' }} />
          {open ? (
            <ExpandLess style={{ color: open ? "#8e9297" : 'white' }} />
          ) : (
            <ExpandMore style={{ color: open ? "#8e9297" : 'white' }} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {channelList.map((channel) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                onClick={() => goToChannel(channel.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <BiHash
                    className={classes.iconDesign}
                    style={{ color: "#b9bbbe" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    channel.channelName === channel.channelName.substr(0, 12)
                      ? channel.channelName
                      : `${channel.channelName.substr(0, 12)}...`
                  }
                  style={{ color: "#dcddde" }}
                />
                {/* <TiUserDeleteOutline
                  className={classes.iconDesign}
                  style={{ color: "#b9bbbe" }}
                  onClick={handleDelete}
                /> */}
                {/* <Button
                  onClick={handleDelete}
                  color="primary"
                  autoFocus
                  variant="contained"
                >
                  Delete
                </Button> */}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Rooms;
