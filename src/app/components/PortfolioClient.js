'use client';

import { useState, useEffect } from 'react';

// 간단한 Markdown-to-HTML 파서 함수
function parseMarkdown(markdownText) {
  if (!markdownText) return '';
  
  let html = markdownText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 인용구/캘아웃 변환
  html = html.replace(/^>\s+💡\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(190, 95%, 50%); background:rgba(6,182,212,0.05); padding:1rem; border-radius:8px;">💡 $1</blockquote>');
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote style="border-left:4px solid hsl(263, 90%, 62%); background:rgba(139,92,246,0.05); padding:1rem; border-radius:8px;">$1</blockquote>');

  // 헤더 변환 (h2, h3)
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');

  // 볼드 텍스트 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 리스트 변환 (ul / li)
  html = html.replace(/^\-\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // 줄바꿈을 문단(<p>) 혹은 <br>로 변경
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br />');
  
  if (!html.startsWith('<h') && !html.startsWith('<u') && !html.startsWith('<l') && !html.startsWith('<b')) {
    html = '<p>' + html + '</p>';
  }

  return html;
}

export default function PortfolioClient({ initialItems }) {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  // 1. 데이터 분류 및 필터링
  // 분류 1: Featured 킬러 성과
  const featuredProjects = initialItems.filter(p => p.featured);
  
  // 분류 2: 학부 이수 과목 (Courses)
  const courses = initialItems.filter(p => p.category === 'Courses' || p.title.toLowerCase().startsWith('course'));
  
  // 분류 3: 자격증 & 도서 & 뱃지 (Licenses, Books)
  const certificates = initialItems.filter(p => p.category === 'Licenses' || p.category === 'Books' || p.title.toLowerCase().includes('badge') || p.title.toLowerCase().includes('certificate of'));
  
  // 분류 4: 일반 포트폴리오 리스트 (Course와 License류는 완전 제거)
  const projects = initialItems.filter(p => {
    const isCourse = p.category === 'Courses' || p.title.toLowerCase().startsWith('course');
    const isLicense = p.category === 'Licenses' || p.category === 'Books' || p.title.toLowerCase().includes('badge') || p.title.toLowerCase().includes('certificate of');
    return !isCourse && !isLicense;
  });

  // 고유 카테고리 (일반 프로젝트 기준)
  const categories = ['전체', ...new Set(projects.map(p => p.category))];

  // 필터링 및 검색 로직
  const filteredItems = projects.filter(item => {
    const matchesCategory = activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 모달을 열 때 실시간 온디맨드로 노션 본문 블록 가져오기
  const handleOpenModal = async (project) => {
    setSelectedProject(project);
    setModalContent('');
    setIsModalLoading(true);

    try {
      const res = await fetch(`/api/project-content?id=${project.id}`);
      const data = await res.json();
      setModalContent(data.content);
    } catch (err) {
      setModalContent('상세 소개 내용을 불러오는데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div className="portfolio-content">
      {/* Ambient backgrounds */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Navigation */}
      <header>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            PORTFOLIO.
          </div>
          <nav className="nav-links">
            <a className="nav-link" onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}>Featured</a>
            <a className="nav-link" onClick={() => document.getElementById('works').scrollIntoView({ behavior: 'smooth' })}>Works</a>
            <a className="nav-link" onClick={() => document.getElementById('credentials').scrollIntoView({ behavior: 'smooth' })}>Qualifications</a>
            <a className="nav-link" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">Notion API Premium Dynamic Resume</div>
        <h1 className="hero-title">
          안녕하세요, 저의 <span>경험과 도전</span>을<br />소개하는 공간입니다.
        </h1>
        <p className="hero-subtitle">
          이 웹사이트는 노션 데이터베이스와 실시간으로 연동되어 있습니다. 제가 노션에서 포트폴리오 정보를 업데이트하면 언제든 실시간으로 갱신됩니다.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}>
            포트폴리오 구경하기
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary">
            GitHub
          </a>
        </div>
      </section>

      {/* 🏆 1. Featured Achievements Section (추천 핵심 성과) */}
      {featuredProjects.length > 0 && (
        <section id="featured" className="featured-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem 2rem' }}>
          <div className="section-header">
            <h2 className="section-title" style={{ color: 'hsl(263, 90%, 62%)' }}>🏆 Featured Achievements</h2>
            <p class="section-desc">가장 자랑하고 싶고 성과가 높았던 핵심 프로젝트 및 공모전 수상작 모음입니다.</p>
          </div>
          <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map(p => (
              <div key={p.id} className="card featured-card" onClick={() => handleOpenModal(p)} style={{
                background: 'linear-gradient(135deg, rgba(20, 15, 38, 0.6) 0%, rgba(10, 15, 28, 0.6) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.08)'
              }}>
                <div className="card-top">
                  <div className="card-header">
                    <span className="card-category">{p.category}</span>
                    <span className="featured-badge" style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.85rem',
                      borderRadius: '9999px',
                      color: 'hsl(190, 95%, 50%)',
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      boxShadow: '0 0 10px rgba(6, 182, 212, 0.1)'
                    }}>{p.badge}</span>
                  </div>
                  <h3 className="card-title" style={{ color: 'hsl(var(--foreground))', fontSize: '1.6rem' }}>{p.title}</h3>
                  <p className="card-desc">{p.description}</p>
                </div>
                <div className="card-meta">
                  <div className="card-tags">
                    {p.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <span className="card-period">{p.period || '진행 기간 없음'}</span>
                    <span className="card-arrow" style={{ color: 'hsl(263, 90%, 62%)' }}>자세히 보기 &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 📋 2. Works Section (일반 프로젝트 그리드) */}
      <section id="works" className="portfolio">
        <div className="section-header">
          <h2 className="section-title">My Projects &amp; Careers</h2>
          <p className="section-desc">학술 이수 과목과 기본 자격증은 분리하여 정리하고, 핵심 대내외 활동만 모아두어 가독성을 극대화했습니다.</p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', position: 'relative' }}>
          <input
            type="text"
            placeholder="프로젝트 제목, 태그 또는 설명으로 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 18, 30, 0.5)',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
          />
        </div>

        {/* Filter Categories */}
        <div className="filter-container">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid">
          {filteredItems.map(item => (
            <div key={item.id} className="card" onClick={() => handleOpenModal(item)}>
              <div className="card-top">
                <div className="card-header">
                  <span className="card-category">{item.category}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
              </div>
              <div className="card-meta">
                <div className="card-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="card-period">{item.period || '진행 기간 없음'}</span>
                  <span className="card-arrow">자세히 보기 &rarr;</span>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0', color: 'hsl(var(--muted))' }}>
              검색 조건에 맞는 프로젝트가 존재하지 않습니다.
            </div>
          )}
        </div>
      </section>

      {/* 🎓 3. Academic & Credentials Section (이수과목 & 자격증 최적화 요약본) */}
      <section id="credentials" className="credentials-section" style={{
        maxWidth: '1200px',
        margin: '4rem auto 0 auto',
        padding: '5rem 2rem 1rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="section-header">
          <h2 className="section-title">🎓 Qualifications &amp; Studies</h2>
          <p className="section-desc">이수한 전공 과목과 보유 자격증 목록을 깔끔한 태그와 그룹으로 모아두었습니다.</p>
        </div>
        <div className="credentials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem'
        }}>
          {/* 이수과목 패널 */}
          <div className="credentials-panel" style={{
            background: 'rgba(15, 18, 30, 0.3)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            padding: '2.5rem',
            borderRadius: '24px'
          }}>
            <h3 className="panel-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'hsl(var(--foreground))',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>📚 Relevant Coursework</h3>
            <div className="course-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {courses.map(c => {
                const cleanName = c.title.replace(/^course\s*:\s*/i, '');
                return (
                  <span key={c.id} className="course-pill" onClick={() => handleOpenModal(c)} style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: 'hsl(var(--muted))',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>{cleanName}</span>
                );
              })}
            </div>
          </div>
          {/* 자격증 패널 */}
          <div className="credentials-panel" style={{
            background: 'rgba(15, 18, 30, 0.3)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            padding: '2.5rem',
            borderRadius: '24px'
          }}>
            <h3 className="panel-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'hsl(var(--foreground))',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>🎫 Licenses &amp; Certificates</h3>
            <div className="cert-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {certificates.map(c => (
                <div key={c.id} className="cert-item" onClick={() => handleOpenModal(c)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                  <span className="cert-name" style={{ fontWeight: 600, color: 'hsl(var(--foreground))' }}>{c.title}</span>
                  <span className="cert-badge" style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'hsl(var(--accent-secondary))',
                    textTransform: 'uppercase'
                  }}>{c.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <footer id="about">
        <div className="footer-container">
          <h2 className="footer-title">Let's Create Something Great</h2>
          <p className="footer-desc">
            노션을 활용하여 더 창의적이고 실용적인 웹 환경을 만드는 데 관심이 많습니다. 협업 요청이나 질문이 있으시면 언제든지 편하게 이메일로 연락주세요!
          </p>
          <a href="mailto:youremail@example.com" className="contact-email">
            youremail@example.com
          </a>
          <p className="footer-copy">
            &copy; 2026. Custom Notion Portfolio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <span className="modal-category">{selectedProject.category}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-meta-grid">
              <div className="modal-meta-item">
                <span>기관 / 소속</span>
                <p>{selectedProject.role || '소속 정보 없음'}</p>
              </div>
              <div className="modal-meta-item">
                <span>진행 기간</span>
                <p>{selectedProject.period || '기간 정보 없음'}</p>
              </div>
            </div>

            <div className="modal-body">
              {isModalLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'hsl(190, 95%, 50%)' }}>
                  <div className="spinner" style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    border: '3px solid rgba(255,255,255,0.05)',
                    borderTopColor: 'hsl(190, 95%, 50%)',
                    borderRadius: '50%',
                    animation: 'spin 1s infinite linear'
                  }}></div>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'hsl(var(--muted))' }}>노션 페이지 본문을 불러오는 중입니다...</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(modalContent) }} />
              )}
            </div>

            <div className="modal-footer">
              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                  관련 링크 바로가기
                </a>
              )}
              <button className="btn-secondary" onClick={() => setSelectedProject(null)} style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inject spinner animation style */}
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
