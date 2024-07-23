import React from 'react';


function Edit({stroke = "black"}) {

  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7.5H6C5.46957 7.5 4.96086 7.71071 4.58579 8.08579C4.21071 8.46086 4 8.96957 4 9.5V18.5C4 19.0304 4.21071 19.5391 4.58579 19.9142C4.96086 20.2893 5.46957 20.5 6 20.5H15C15.5304 20.5 16.0391 20.2893 16.4142 19.9142C16.7893 19.5391 17 19.0304 17 18.5V17.5" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 5.49998L19 8.49998M20.385 7.08499C20.7788 6.69114 21.0001 6.15697 21.0001 5.59998C21.0001 5.043 20.7788 4.50883 20.385 4.11498C19.9912 3.72114 19.457 3.49988 18.9 3.49988C18.343 3.49988 17.8088 3.72114 17.415 4.11498L9 12.5V15.5H12L20.385 7.08499Z" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export default Edit;