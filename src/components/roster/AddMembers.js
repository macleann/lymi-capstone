import Multiselect from "multiselect-react-dropdown";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { RosterContext } from "./RosterProvider";

export const AddMembers = () => {
  const { bandId } = useParams();
  const { users, setUsers, getUsers, putUpdatedUser } = useContext(AuthContext);
  const { postNewArtistBand } = useContext(RosterContext);
  const [preSelectedUsers, setPreSelectedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    // Creates a new array of filtered users
    const usersInBand = users.filter((user) => {
      // Only returns users containing an artistBand object with a matching bandId property
      return user.artistBands.find((aB) => aB.bandId === parseInt(bandId));
    });
    // Any user that's already a member of the band will be preselected
    setPreSelectedUsers(usersInBand);
    // The component may now render
    setIsLoading(false);
  }, [users]);

  const handleAddMembers = (evt) => {
    evt.preventDefault();
    // Loops through each selected user ID
    selectedUsers.forEach((userId) => {
      // Finds the user object that matches the selected user ID
      const user = users.find((u) => u.id === parseInt(userId));
      // If the user exists and is not already in the band
      if (user && !preSelectedUsers.some((p) => p.id === user.id)) {
        // Creates a new artistBand object with the user ID and band ID
        const artistBand = {
          userId: user.id,
          bandId: parseInt(bandId),
        };
        // Posts the new artistBand object to the API
        postNewArtistBand(artistBand);

        // If the user is not already an artist
        if (!user.isArtist) {
          // Creates a new user object with isArtist set to true
          const userIsArtistNow = { ...user, isArtist: true };
          // Removes the artistBands property from the new user object
          const { artistBands, ...updatedUser } = userIsArtistNow;
          // Puts the updated user object to the API
          putUpdatedUser(updatedUser);
        }
      }
    });
    // Confirming that something happened (this could be better)
    window.alert("Band members updated!");
    // Reloads the page (preselected users will be updated)
    window.location.reload();
  };

  // Don't render the component until everything else has run
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Add Members to Band</h2>
      <Multiselect
        // Sets the array of user objects as the options for Multiselect
        options={users}
        // Sets the name property of each object as the displayed option
        displayValue="name"
        // Preselects an array of user objects, so long as each has an artistBand object with matching bandId
        selectedValues={preSelectedUsers}
        // Prevents the preselected users from being unselected
        disablePreSelectedValues
        /*
        Both onSelect and onRemove are callback functions for Multiselect and each require two arguments if you want
        them to return an array of selected items.
        Though it doesn't look like it's doing anything, removing selectedList will result in selectedUsers being
        [undefined] (or [undefined, undefined] in the event of multiple selections)
        */
        onSelect={(selectedList, selectedItem) => {
          setSelectedUsers([...selectedUsers, selectedItem.id]);
        }}
        onRemove={(selectedList, removedItem) => {
          setSelectedUsers(selectedUsers.filter((id) => id !== removedItem.id));
        }}
      />
      <button onClick={handleAddMembers}>Add Members</button>
    </div>
  );
};
