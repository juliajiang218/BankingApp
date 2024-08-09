import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  
  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts = {[]}
            totalBanks={2}
            totalCurrentBalance={800.21}
          />
        </header>

        RECENT TRANSACTION
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{
          currentBalance: 800.21
          
        },{}]}
      />
    </section>
  )
}

export default Home
