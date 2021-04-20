import React from 'react'; 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import '../../Style/FAQ.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordion-rounded": {
      margin: "0.8rem auto"
    },
    "& .Mui-expanded": {},
    "& .MuiAccordionDetails-root": {
      padding: "0 10px 12px 10px",
    },
    "& .MuiAccordionSummary-content.Mui-expanded ": {
      margin: "10px 0",
    },
    "& .MuiAccordionSummary-content": {
      margin: "10px 0",
    },
    "& .MuiAccordionSummary-root": {
      padding: "0 10px",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "0",
    },
    "& .MuiIconButton-root" : {
      color: "var(--mainWhite)"
    },
    "& .makeStyles-acc-14" : {
      width: "100%"
    }
  },
  acc: {
    transition: "all linear 0.2s",
    color: "var(--mainWhite)",
    backgroundColor: "var(--contrastColor)",
    boxShadow: "none"
  },
  heading: {
    fontSize: "1em",
    transition: "all linear 0.2s",
    flexBasis: "100%",
    margin: "0rem auto",
    textAlign: "left"
  },
  details: {
    fontSize: "1em",
    textAlign: "left"
  },
}));

const FAQ = () => {
  const faqArray = [
    {
      "id" : 0,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    },
    {
      "id" : 1,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    },
    {
      "id" : 2,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    },
    {
      "id" : 3,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    },
    {
      "id" : 4,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    },
    {
      "id" : 5,
      "question" : "Whats my name ?",
      "answer" : "My name is Dora."
    }
  ];

  const classes = useStyles();
  
  return (
    <div className = "faq-main">
      <div className = "faq-header">
        FAQ
      </div>
      <div className = "faq-accordion">
        {faqArray.map((item) => {
          return (
            <div className = "accordion-container">
              <Accordion className = {classes.acc}>
                <AccordionSummary expandIcon={<ExpandMoreIcon className = "icon"/>} className = {classes.heading} >
                  #{item.id + 1} {item.question}
                </AccordionSummary>
                <AccordionDetails className = {classes.details} >
                  {item.answer}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
      <div className = "faq-contactus">
        Can't find your question ?
        <button className= "contact-us-button">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default FAQ;