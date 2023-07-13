import React, { useState } from 'react';
import axios from 'axios';
import actions from "../../redux/modules"
import { axiosInstanceUsermanagement } from '../../api';

const AddFriends = () => {
  const [wholesaler_id, setWholesaler_ID] = useState('');
  const [retailer_id, setRetailer_ID] = useState('');
  const [searchcompany_name, setSearchCompanyName] = useState('');
  const [searchResults, setSearchResults] = useState<{ company_name: string; retailer_id: string }[]>([]);

  const handleSearch = async () => {
    try {
      const accountType = sessionStorage.getItem('accountType');
      let account_type = 0;
      if (accountType === 'retailer') {
        account_type = 1;
      }
      const response = await axiosInstanceUsermanagement.post('/api/search-friends', {
        company_name: searchcompany_name,
        account_type: account_type, 
      });
      setSearchResults(response.data.results); // Update the state with the received search results
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message);
      } else {
        console.error(error);
      }
      setSearchResults([]);
    }
  };

  const handleAddFriend = async (retailerId: string) => {
    try {
      const response = await axiosInstanceUsermanagement.post('/api/add-friend', {
        wholesaler_id: wholesaler_id,
        retailer_id: retailer_id,
      });
      console.log(response.data.message); // Friend added successfully
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add Friends</h2>
      <div>
        <label>Search by Company Name:</label>
        <input
          type="text"
          value={searchcompany_name}
          onChange={(e) => setSearchCompanyName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Search Results:</h3>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.retailer_id}>
                {result.company_name} - {result.retailer_id}
                <button onClick={() => handleAddFriend(result.retailer_id)}>Add Friend</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default AddFriends;

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddFriends = () => {
//   const [wholesaler_id, setWholesaler_ID] = useState('');
//   const [retailer_id, setRetailer_ID] = useState('');
//   const [searchcompany_name, setSearchCompanyName] = useState('');
//   const [searchResults, setSearchResults] = useState<{ company_name: string; retailer_id: string }[]>([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.post('/api/wholesalerhome', {
//         company_name: searchcompany_name,
//         account_type: 1, // Assuming 1 represents the retailer account type
//       });
//       setSearchResults(response.data.message); // Set the search results received from the backend
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error(error.response?.data?.message);
//       } else {
//         console.error(error);
//       }
//       setSearchResults([]);
//     }
//   };
  

//   const handleAddFriend = async (retailerId: string) => {
//     try {
//       const response = await axios.post('/add-friend', {
//         wholesaler_id: wholesaler_id,
//         retailer_id: retailerId,
//       });
//       console.log(response.data.message); // Friend added successfully
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error(error.response?.data?.message);
//       } else {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Add Friends</h2>
//       <div>
//         <label>Wholesaler ID:</label>
//         <input
//           type="text"
//           value={wholesaler_id}
//           onChange={(e) => setWholesaler_ID(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Search by Company Name:</label>
//         <input
//           type="text"
//           value={searchcompany_name}
//           onChange={(e) => setSearchCompanyName(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         <h3>Search Results:</h3>
//         {searchResults.length > 0 ? (
//           <ul>
//             {searchResults.map((result) => (
//               <li key={result.retailer_id}>
//                 {result.company_name} - {result.retailer_id}
//                 <button onClick={() => handleAddFriend(result.retailer_id)}>Add Friend</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddFriends;





// from flask import Flask, jsonify, request

// app = Flask(__name__)

// # Endpoint for searching friends
// @app.route('/api/search', methods=['GET'])
// def search_friends():
//     search_query = request.args.get('query')

//     # Perform a database query to retrieve friends
//     # of the opposite account type based on the search_query
//     # Replace this with your actual database query logic

//     search_results = [
//         {'id': 1, 'companyName': 'Friend 1', 'email': 'friend1@example.com'},
//         {'id': 2, 'companyName': 'Friend 2', 'email': 'friend2@example.com'},
//         # Add more search results as needed
//     ]

//     return jsonify({'results': search_results})

// # Endpoint for adding a friend
// @app.route('/api/friends/add/<int:friend_id>', methods=['POST'])
// def add_friend(friend_id):
//     # Save the friend request to the database
//     # Replace this with your actual database save logic

//     # Return a success message or appropriate response
//     return jsonify({'message': 'Friend added successfully'})

// if __name__ == '__main__':
//     app.run()
