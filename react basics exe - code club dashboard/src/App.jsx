import { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import Notice from './components/Notice';
import MembersList from './components/MembersList';
import TasksPanel from './components/TasksPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  // 1. ה-State שנדרש לנהל
  const [members, setMembers] = useState([
    { id: 1, name: 'תמר וייס', role: 'Leader', isActive: true },
    { id: 2, name: 'דני כהן', role: 'Member', isActive: true },
    { id: 3, name: 'יוסי לוי', role: 'Guest', isActive: false },
    { id: 4, name: 'מיכל שרון', role: 'Member', isActive: true },
  ]);

  const [tasks, setTasks] = useState([
    { id: 101, title: 'להכין את מצגת המועדון', done: false, assignedTo: 1 },
    { id: 102, title: 'לסקור PR ב-GitHub', done: true, assignedTo: 1 },
    { id: 103, title: 'לעדכן את מסמכי הדרישות', done: false, assignedTo: 2 },
    { id: 104, title: 'לתאם חדר לישיבה', done: false, assignedTo: 3 },
  ]);

  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [layout, setLayout] = useState('list');

  // 2. סינון חברי המועדון לפי מתג הפעילים
  const filteredMembers = showOnlyActive
    ? members.filter((member) => member.isActive)
    : members;

  // 3. מציאת החבר שנבחר כרגע
  const selectedMember = members.find((m) => m.id === selectedMemberId);

  // 4. סינון המשימות של החבר שנבחר
  const selectedMemberTasks = selectedMemberId
    ? tasks.filter((task) => task.assignedTo === selectedMemberId)
    : [];

  // 5. שינוי סטטוס משימה (Done / Undone)
  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="app-container">
      <Header />

      <main className="dashboard-content">
        <FilterBar
          showOnlyActive={showOnlyActive}
          setShowOnlyActive={setShowOnlyActive}
          layout={layout}
          setLayout={setLayout}
        />

        {/* Notice מותנה: מופיע רק אם נבחר חבר שהוא אינו פעיל */}
        {selectedMember && !selectedMember.isActive && (
          <Notice
            type="warning"
            message={`שימו לב: ${selectedMember.name} מוגדר/ת כרגע כחבר/ה לא פעיל/ה.`}
          />
        )}

        <div className="dashboard-main-area">
          <MembersList
            members={filteredMembers}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
            layout={layout}
          />

          <TasksPanel
            selectedMember={selectedMember}
            tasks={selectedMemberTasks}
            onToggleTask={handleToggleTask}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;