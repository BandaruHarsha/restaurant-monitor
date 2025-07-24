import Head from 'next/head';
import data from '../data/availability.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Restaurant Availability Dashboard</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-center">Domino's Availability Monitor</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Link</th>
              <th className="py-3 px-4">Expected Hours</th>
              <th className="py-3 px-4">Actual Availability</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((restaurant, index) => {
              const expectedOpen = !restaurant.expectedHours.toLowerCase().includes('closed');
              const isMismatch = expectedOpen && restaurant.actualAvailability === 'unavailable';
              return (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{restaurant.name}</td>
                  <td className="py-3 px-4 text-blue-600 underline">
                    <a href={restaurant.url} target="_blank" rel="noopener noreferrer">View</a>
                  </td>
                  <td className="py-3 px-4">{restaurant.expectedHours}</td>
                  <td className="py-3 px-4">{restaurant.actualAvailability}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${isMismatch ? 'text-red-600' : 'text-green-600'}`}>
                      {isMismatch ? 'Mismatch' : 'OK'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
