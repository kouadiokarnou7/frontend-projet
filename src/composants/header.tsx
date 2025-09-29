


export default function Header() {
    return (
      <header className="flex justify-between items-center bg-white shadow-md px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo Église" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-gray-900">Admin Général</h1>
        </div>
        <div className="flex items-center gap-4">
          
          <button className="relative">
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            🔔
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Personne connectée 
          </button>
        </div>
      </header>
    );
  }
  