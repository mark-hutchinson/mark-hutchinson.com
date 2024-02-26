import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import projectLimitBreak from './data/projects/limitbreak.json'
import projectPoker from './data/projects/poker.json'
import projectWordstreak from './data/projects/wordstreak.json'
import projectFarmville from './data/projects/farmville.json'
import projectIbm from './data/projects/ibm.json'

import {About} from "./components/About";
import {Project, LayoutTypeImagesLeft, LayoutTypeImagesRight} from "./components/Project";
import {NavBar} from "./components/NavBar";
import {Contact} from "./components/Contact";
import {Section} from "./components/Section";

function App() {
  return (
    <div className="App">
      <Section id="about">
         <About/>
      </Section>
      <Section id="experience">
        <Project data={projectLimitBreak} layoutType={LayoutTypeImagesRight}/>
        <Project data={projectPoker} layoutType={LayoutTypeImagesLeft}/>
        <Project data={projectWordstreak} layoutType={LayoutTypeImagesRight}/>
        <Project data={projectFarmville} layoutType={LayoutTypeImagesLeft}/>
        <Project data={projectIbm} layoutType={LayoutTypeImagesRight}/>
      </Section>
      <Section id="contact">
        <Contact/>
      </Section>
      <NavBar items={[
        {ref: "about", label: "About"},
        {ref: "experience", label: "Experience"},
        {ref: "contact", label: "Contact"},
      ]}/>
    </div>
  );
}

export default App;
