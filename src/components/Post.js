import React from 'react';

function Post({ alpha2Code, callingCodes, capital, name, region, onDelete }) {
    
    return (
        <tr>
            <th>{alpha2Code}</th>
            <th>{callingCodes}</th>
            <th>{capital}</th>
            <th>{name}</th>
            <th>{region}</th>
            <th><button onClick={() => onDelete(alpha2Code) } >X</button></th>
        </tr>
    );
}

export default Post;