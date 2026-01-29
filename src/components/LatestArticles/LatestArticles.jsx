import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LatestArticles.css";
import { Link } from "react-router"; 

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/posts.json")
      .then((response) => {
        if (response.data && response.data.posts) {
          setArticles(response.data.posts.slice(3, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("حدث خطأ أثناء تحميل البيانات");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  if (loading)
    return <div className="text-white text-center p-5">جارٍ التحميل...</div>;
  if (error) return <div className="text-danger text-center p-5">{error}</div>;

  return (
    <section className="latest-articles-section">
      <div className="decorative-gradient"></div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
          <div>
            <span className="text-orange fw-bold small spanColor">
              <i className="fa-solid fa-circle fa-2xs text-orange"></i>
              <i className="fa-solid fa-circle fa-2xs fa-beat me-1 ms-1 text-orange"></i>
              الأحدث
            </span>
            <h2 className="fw-bold text-white mb-1 mt-1 display-6">
              أحدث المقالات
            </h2>
            <p className="text-secondary mb-0">محتوى جديد طازج من المطبعة</p>
          </div>
          <Link
            to="/blog"
            className="text-orange text-decoration-none fw-bold view-all-hover"
          >
            عرض جميع المقالات <i className="fa-solid fa-arrow-left me-2 arrow-icon"></i>
          </Link>
        </div>

        <div className="row g-4">
          {articles.map((article) => {
            const articleSlug = article.title.replace('/\s+/g', '-');

            return (
              <div key={article.id} className="col-lg-4 col-md-6">
                <Link 
                  to={`/blog/${articleSlug}`}
                  className="card rounded-5 h-100 custom-card border-secondary bg-dark text-white overflow-hidden text-decoration-none"
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={article.image}
                      className="card-img-top object-fit-cover card-img-height"
                      alt={article.title}
                    />
                    <span className="badge bg-black bg-opacity-75 position-absolute top-0 end-0 m-3 rounded-pill px-3">
                      {article.category}
                    </span>
                  </div>

                  <div className="card-body d-flex flex-column p-4">
                    <div className="d-flex align-items-center gap-2 text-secondary small mb-3">
                      <span>
                        <i className="far fa-clock"></i> {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                    </div>

                    <h5 className="card-title fw-bold mb-3">{article.title}</h5>

                    <p className="card-text text-secondary line-clamp-3 flex-grow-1">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="card-footer bg-transparent border-secondary p-4 pt-0 border-0">
                    <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                      <button className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-0 text-orange border-secondary arrow-btn">
                        &#10094;
                      </button>

                      <div className="d-flex align-items-center gap-2">
                        <div className="text-end lh-1">
                          <div className="fw-bold small">
                            {article.author.name}
                          </div>
                          <div className="text-secondary author-role-text">
                            {article.author.role}
                          </div>
                        </div>
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="rounded-circle border border-secondary"
                          width="40"
                          height="40"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;