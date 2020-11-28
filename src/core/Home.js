import React from 'react';
import Hero from '../Components/Hero/Hero';
import DemoVideo from '../Components/DemoVideo/DemoVideo';
import ServiceTier from '../Components/ServiceTier/ServiceTier';
import '../Style/Home.css';
import IsLoading from "../Components/Loader/Loading";

const Home = () => {
  const homeSections = [
    {
      sectionName : "Demo Video",
      sectionDesc : "A demo video to help you get familiar with ved.studio",
      sectionContent : <DemoVideo />
    },
    {
      sectionName : "Service Tier",
      sectionDesc : "Select the service based on your organization size and need",
      sectionContent : <ServiceTier />
    }
  ];

  return (
    <div className = "app-sections">
      <Hero />
      {
        homeSections.map((item) => {
          return (   
            <div className = "section">         
              <div className = "section-head"> {item.sectionName} </div>
              <div className = "section-desc"> {item.sectionDesc} </div>
              <div className = "section-content"> {item.sectionContent} </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default IsLoading(Home);