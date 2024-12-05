import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../realworldblog-api/rwbapi';
import './article.css';
import Markdown from 'react-markdown';
import { Button } from 'antd';
import { useAuth } from '../../realworldblog-api/auth-contect';

const Article = () => {
  const { slug } = useParams(); // Get slug from the URL
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current logged-in user
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiService = new ApiService();

  useEffect(() => {
    apiService
      .getArticle(slug)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const handleEditArticle = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDeleteArticle = () => {
    apiService
      .deleteArticle(slug)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { title, body, description, tags, author, createdAt, favoritesCount } = article;

  return (
    <div className="article-container">
      <div className="list-element">
        <div className="one-article__left-side-of-the-element">
          <div className="one-article__header">
            <div className="one-article__header-title">
              <h1>{title}</h1>
            </div>
            <div className="one-article__like">♥{favoritesCount}</div>
          </div>
          <div className="one-article__tags">
            {tags.map((tag, index) => (
              <span key={index} className="one-article__tags__single-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="one-article__kurztext">{description}</div>
          <div className="one-acticle__overview">
            <Markdown>{body}</Markdown>
          </div>
        </div>
        <div className="one-article__right-side-of-the-element">
          <div className="one-article__author-info">
            <div className="one-article__author-info-left-side">
              <div className="one-article__author-info__username">{author.username}</div>
              <div className="one-article__author-info__post-date">{new Date(createdAt).toLocaleDateString()}</div>
            </div>
            <div className="one-article__author-info-right-side">
              <div className="one-article__author-info__avatar">
                <img src={author.image || 'placeholder-avatar.png'} alt={author.username} />
              </div>
            </div>
          </div>
          {user?.username === author.username && (
            <>
              <Button onClick={handleEditArticle} className="edit-article-btn">
                Edit
              </Button>
              <Button type="primary" danger onClick={handleDeleteArticle} className="delete-article-btn">
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;

// import React from 'react';
// import './article.css';

// const Article = () => {
//   return (
//     <div className="article-container">
//       <div className="list-element">
//         <div className="one-article__left-side-of-the-element">
//           <div className="one-article__header">
//             <div className="one-article__header-title">
//               <p>Some title</p>
//             </div>
//             <div className="one-article__like">♥3</div>
//           </div>
//           <div className="one-article__tags">
//             <span className="one-article__tags__single-tag">Tag1</span>
//           </div>
//           <div className="one-article__kurztext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facere tenetur saepe laboriosam deserunt
//             perspiciatis explicabo rem incidunt fugit quod, accusamus laudantium, veritatis, animi vero ratione earum
//             magnam reprehenderit nobis!
//           </div>
//           <div className="one-acticle__overview">
//             Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
//             Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
//             responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo
//             omnes ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides:
//             aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita?
//             Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno
//             cernunt Venus draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3.
//             Paris includere etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis
//             siqua
//           </div>
//         </div>
//         <div className="one-article__right-side-of-the-element">
//           <div className="one-article__author-info">
//             <div className="one-article__author-info-left-side">
//               <div className="one-article__author-info__username">John Appleseed</div>
//               <div className="one-article__author-info__post-date">post-date</div>
//             </div>
//             <div className="one-article__author-info-right-side">
//               <div className="one-article__author-info__avatar">
//                 <img src="src/components/list-element/avatar.svg" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Article;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ApiService from '../../realworldblog-api/rwbapi';
// import './article.css';
// import Markdown from 'react-markdown';
// import { Button, Flex } from 'antd';

// const Article = () => {
//   const { slug } = useParams(); // Get slug from the URL
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiService = new ApiService();

//   useEffect(() => {
//     apiService
//       .getArticle(slug) // Fetch the article by slug
//       .then((data) => {
//         setArticle(data); // Set the article data in state
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const { title, body, description, tags, author, createdAt, favoritesCount } = article;

//   return (
//     <div className="article-container">
//       <div className="list-element">
//         <div className="one-article__left-side-of-the-element">
//           <div className="one-article__header">
//             <div className="one-article__header-title">
//               <h1>{title}</h1>
//             </div>
//             <div className="one-article__like">♥{favoritesCount}</div>
//           </div>
//           <div className="one-article__tags">
//             {tags.map((tag, index) => (
//               <span key={index} className="one-article__tags__single-tag">
//                 {tag}
//               </span>
//             ))}
//           </div>
//           <div className="one-article__kurztext">{description}</div>
//           <div className="one-acticle__overview">
//             <Markdown>{body}</Markdown>
//           </div>
//         </div>
//         <div className="one-article__right-side-of-the-element">
//           <div className="one-article__author-info">
//             <div className="one-article__author-info-left-side">
//               <div className="one-article__author-info__username">{author.username}</div>
//               <div className="one-article__author-info__post-date">{new Date(createdAt).toLocaleDateString()}</div>
//             </div>
//             <div className="one-article__author-info-right-side">
//               <div className="one-article__author-info__avatar">
//                 <img src={author.image || 'placeholder-avatar.png'} alt={author.username} />
//               </div>
//               <Button type="primary" danger ghost>
//                 Delete
//               </Button>
//               <Button ghost>Edit</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Article;
