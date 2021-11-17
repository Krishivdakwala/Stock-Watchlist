import React from "react";
import { Divider, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { motion }  from 'framer-motion/dist/es/index';
import Fade from 'react-reveal/Fade';
import AddIcon from '@material-ui/icons/Add';
import GetAppRounded from '@material-ui/icons/GetApp';

const Watchlist = () => {
  let content = [
    {
        title:"Create Watchlist",
        cardContent:<AddIcon fontSize="large" />,
        path:"/watchlist",

    },
    {
        title:"View Watchlists",
        cardContent:<GetAppRounded fontSize="large"/>,
        path:"/viewWatchlists",

    },
  ]
  return (
    <Fade>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'white'}}>
                <div style={{margin:'10px',fontWeight:'bolder',fontSize:'30px'}}>Stock Tracker</div>
                <Divider style={{height:'2px',width:'80%',margin:'10px',backgroundColor:'white'}}/>
                <div style={{margin:'10px',fontWeight:'bolder',fontSize:'18px'}}>Watchlist Options</div>
                <div style={{width:'30%',display:'flex',justifyContent:'space-around',flexWrap:'wrap',alignItems:'center',marginTop:'30px'}}>
                {
                    content.map((item,index)=>{
                        return(
                            <motion.div
                                
                                key={index}
                                initial={{backgroundColor:'#00182E',color:'#fff',borderRadius:'5px',cursor:'pointer',margin:'10px',width:'200px',height:'150px',display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column'}}
                                whileHover={{boxShadow:'3px 2px 2px  aqua',scale:'1.1',transition:'transform 6s cubic-bezier(0.075, 0.82, 0.165, 1)'}}
                                
                                >
                                
                                <motion.div initial={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'200px'}}
                                    whileHover={{backgroundColor:'#02203C'}}
                                >
                                  <Link to={item.path} style={{textDecoration:'inherit'}}>
                                    <div style={{width:'270px'}}>
                                        <h2>
                                            {item.title}
                                        </h2>
                                        <p>
                                            {item.cardContent}
                                        </p>
                                    </div>
                                  </Link> 
                                </motion.div>
                                
                            </motion.div>
                        )
                    })
                }
                </div>
                <Divider style={{height:'2px',width:'80%',margin:'10px',backgroundColor:'white',marginTop:'30px'}}/>
                <div style={{margin:'10px',fontWeight:'bolder',fontSize:'18px'}}>
                <Button variant="contained" href="/watchlist" style={{
                                                borderRadius: 35,
                                                backgroundColor: "#00182E",
                                                padding: "18px 36px",
                                                fontSize: "18px",
                                                color: "#ffff"
                                            }}>Sign Out</Button>
                </div>
            </div>
            </Fade>
  );
};

export default Watchlist;
