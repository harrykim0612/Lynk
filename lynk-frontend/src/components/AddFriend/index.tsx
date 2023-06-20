import React, { useState } from "react";

interface Props {
  companyName: string;
}

const AddFriend: React.FC<Props> = ({ companyName }) => {
  const [friendCompanyName, setFriendCompanyName] = useState("");

  const handleAddFriend = () => {
    // Code to send friend request using friendCompanyName and companyName
    if (friendCompanyName === "") {
      console.log("Please enter a friend's company name.");
    } else if (friendCompanyName === companyName) {
      console.log("You cannot send a friend request to your own company.");
    } else {
      // Implement your own logic to send the friend request
      console.log(`Friend request sent from ${companyName} to ${friendCompanyName}`);
      setFriendCompanyName("");
    }
  };

  return (
    <div>
      <h2>Add a Friend</h2>
      <label htmlFor="friendCompanyName">Enter Friend's Company Name:</label>
      <input
        type="text"
        id="friendCompanyName"
        value={friendCompanyName}
        onChange={(e) => setFriendCompanyName(e.target.value)}
      />
      <button onClick={handleAddFriend}>Send Friend Request</button>
    </div>
  );
};

export default AddFriend;



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
