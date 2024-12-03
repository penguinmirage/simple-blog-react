import React from 'react';
import { useNavigate } from 'react-router-dom';
import './list-element.css';

const ListElement = ({ title, description, tags, author, createdAt, favoritesCount, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${slug}`);
  };

  return (
    <div className="one-article list-element" onClick={handleClick}>
      <div className="one-article__left-side-of-the-element">
        <div className="one-article__header">
          <div className="one-article__header-title">
            <p>{title}</p>
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
      </div>
    </div>
  );
};

export default ListElement;

// import React from 'react';
// import './list-element.css';

// const ListElement = ({ title, description, tags, author, createdAt, favoritesCount }) => {
//   return (
//     <div className="one-article list-element">
//       <div className="one-article__left-side-of-the-element">
//         <div className="one-article__header">
//           <div className="one-article__header-title">
//             <p>{title}</p>
//           </div>
//           <div className="one-article__like">♥{favoritesCount}</div>
//         </div>
//         <div className="one-article__tags">
//           {tags.map((tag, index) => (
//             <span key={index} className="one-article__tags__single-tag">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <div className="one-article__kurztext">{description}</div>
//       </div>
//       <div className="one-article__right-side-of-the-element">
//         <div className="one-article__author-info">
//           <div className="one-article__author-info-left-side">
//             <div className="one-article__author-info__username">{author.username}</div>
//             <div className="one-article__author-info__post-date">{new Date(createdAt).toLocaleDateString()}</div>
//           </div>
//           <div className="one-article__author-info-right-side">
//             <div className="one-article__author-info__avatar">
//               <img
//                 src={author.image || 'placeholder-avatar.png'} // Use a placeholder if no image
//                 alt={author.username}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListElement;

// import React from 'react';
// import './list-element.css';

// const ListElement = () => {
//   return (
//     <div className="one-article list-element">
//       <div className="one-article__left-side-of-the-element">
//         <div className="one-article__header">
//           <div className="one-article__header-title">
//             <p>Some title</p>
//           </div>
//           <div className="one-article__like">♥3</div>
//         </div>
//         <div className="one-article__tags">
//           <span className="one-article__tags__single-tag">Tag1</span>
//         </div>
//         <div className="one-article__kurztext">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facere tenetur saepe laboriosam deserunt
//           perspiciatis explicabo rem incidunt fugit quod, accusamus laudantium, veritatis, animi vero ratione earum
//           magnam reprehenderit nobis!
//         </div>
//         <div className="one-acticle__overview"></div>
//       </div>
//       <div className="one-article__right-side-of-the-element">
//         <div className="one-article__author-info">
//           <div className="one-article__author-info-left-side">
//             <div className="one-article__author-info__username">John Appleseed</div>
//             <div className="one-article__author-info__post-date">post-date</div>
//           </div>
//           <div className="one-article__author-info-right-side">
//             <div className="one-article__author-info__avatar">
//               <img src="src/components/list-element/avatar.svg" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListElement;
