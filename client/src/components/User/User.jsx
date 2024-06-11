import React from 'react';
import UserAside from './UserAside.jsx';
import UserHeader from './UserHeader.jsx';
import UserContent from './UserContent.jsx';

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
{/* Favicon */}
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

const User = () => {
  return (
  <div>
   <div className="flex h-screen bg-gray-800 ">
    <UserAside />
    {/* Header */}
    <div className="flex flex-col flex-1 w-full overflow-y-auto">
       <UserHeader />
        {/* Main content */}
        <UserContent/>  
    </div>
    </div>
  </div>
  )
}

export default User;
