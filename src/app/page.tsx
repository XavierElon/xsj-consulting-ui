import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import TrialPage from '@/components/trialPage'

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <TrialPage />
      </main>
      <div>
        <Footer />
        </div>
    </div>
  )
}