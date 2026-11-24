import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';
import './App.css';

import img1 from './assets/1.png';
import img2 from './assets/2.png';
import img3 from './assets/3.png';

function App() {
  const users = [
    {
      id: 1,
      name: 'תמר וייס',
      description: 'חברה טובה',
      avatar: img1,
      type: 'Friend',
    },
    {
      id: 2,
      name: 'ד"ר יוסי לוי',
      description: 'מרצה לאלגוריתמים ומדעי המחשב.',
      avatar: img2,
      type: 'Teacher',
    },
    {
      id: 3,
      name: 'סתם שם',
      description: 'סטודנטית בשנה ג\', לומדת לפיתוח Fullstack.',
      avatar: img3,
      type: 'Student',
    },
  ];

  return (
    <div className='app-container'>
      <Header />

      <main className='cards-grid'>
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            name={user.name}
            description={user.description}
            avatar={user.avatar}
            type={user.type}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;