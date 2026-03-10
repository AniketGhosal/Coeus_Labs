import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import { DroneCompanyWebsite, CareersPage, TalentSolutionsPage } from './WebsiteComponents'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DroneCompanyWebsite />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/talent-solutions" element={<TalentSolutionsPage />} />
      </Routes>
    </Router>
  )
}
