
import React, { useState, useEffect } from 'react';

 // Import your firebase configuration
import Aside from './Aside.jsx';
import AdminHeader from './AdminHeader.jsx';
import Content from './Content.jsx';
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
{/* Favicon */}

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>


const DemoAdmin = () => {

    

  return (
   <div>
    <div className="flex h-screen bg-gray-800 ">

   <Aside />

{/* Header */}

<div class="flex flex-col flex-1 w-full overflow-y-auto">
    <AdminHeader />

{/* Main content */}
        <Content />
</div>
    
    </div>
</div>

  )

}

export default DemoAdmin
