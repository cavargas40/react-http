import React from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import './Posts.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Carlos'
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        console.log(error);
        //this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({
      pathname: `/posts/${id}`
    });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Somethig went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        /* <Link to={`/posts/${post.id}`} key={post.id}> */
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
        /* </Link> */
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
