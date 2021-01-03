import React from 'react';
import Post from './Post'
import EditPostForm from './EditPostFrom'

function PostList({ posts, onDelete, onCreate, onSort }) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort('alpha2Code')}>alpha2Code</th>
                    <th onClick={() => onSort('callingCodes')}>callingCodes</th>
                    <th onClick={() => onSort('capital')}>capital</th>
                    <th onClick={() => onSort('name')}>name</th>
                    <th onClick={() => onSort('region')}>region</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <EditPostForm onCreate={onCreate}/>
                {posts.map((post) => (
                    <Post
                        key={post.alpha2Code}
                        alpha2Code={post.alpha2Code}
                        callingCodes={post.callingCodes}
                        capital={post.capital}
                        name={post.name}
                        region={post.region}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default PostList;