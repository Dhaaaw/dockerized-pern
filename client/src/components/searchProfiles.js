import React, { useState } from "react";

const SearchProfiles = (props) => {
  const { connectedUser } = props;

  const [users, setUsers] = useState(null);

  return (
    <>
      {connectedUser ? (
        <>
          <div> WAW</div>
        </>
      ) : (
        "You can't access this page while logged out !"
      )}
    </>
  );
};

export default SearchProfiles;
