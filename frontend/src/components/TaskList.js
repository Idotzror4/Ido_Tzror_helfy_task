import { useEffect, useMemo, useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const total = tasks.length;

  // We render: [cloneLast, ...tasks, cloneFirst] for a seamless loop.
  const slides = useMemo(() => {
    if (total === 0) return [];
    if (total === 1) return [tasks[0]];
    return [tasks[total - 1], ...tasks, tasks[0]];
  }, [tasks, total]);

  const [index, setIndex] = useState(1); // 1..total (0 and total+1 are clones)
  const [withTransition, setWithTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  // Reset index when list size changes (e.g. create/delete)
  useEffect(() => {
    if (total <= 1) return;
    setWithTransition(false);
    setIndex(1);
    setIsSliding(false);
    const t = setTimeout(() => setWithTransition(true), 0);
    return () => clearTimeout(t);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      next();
    }, 3000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, index, isSliding]);

  if (!total) {
    return <p>No tasks yet.</p>;
  }

  function next() {
    if (total <= 1) return;
    if (isSliding) return;
    setIsSliding(true);
    setIndex((prev) => prev + 1);
  }

  function prev() {
    if (total <= 1) return;
    if (isSliding) return;
    setIsSliding(true);
    setIndex((prev) => prev - 1);
  }

  function onEnd() {
    if (total <= 1) return;
    setIsSliding(false);

    // If we arrived at a clone, jump (without transition) to the matching real slide.
    if (index === total + 1) {
      setWithTransition(false);
      setIndex(1);
      requestAnimationFrame(() => setWithTransition(true));
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(total);
      requestAnimationFrame(() => setWithTransition(true));
    }
  }

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: 560,
    margin: '16px auto',
    overflow: 'hidden',
    borderRadius: 14,
    border: '1px solid rgba(0,0,0,0.12)',
    background: '#fafafa',
  };

  const trackStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    transform: `translateX(${-index * 100}%)`,
    transition: withTransition ? 'transform 380ms ease' : 'none',
  };

  const slideStyle = {
    flex: '0 0 100%',
    minWidth: '100%',
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    lineHeight: 1,
  };

  return (
    <div style={containerStyle}>
      <div style={trackStyle} onTransitionEnd={onEnd}>
        {slides.map((task, i) => (
          <div
            key={`${i}-${task.id}`}
            style={slideStyle}
          >
            <TaskItem task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button type="button" style={{ ...buttonStyle, left: 10 }} onClick={prev}>
            ‹
          </button>
          <button type="button" style={{ ...buttonStyle, right: 10 }} onClick={next}>
            ›
          </button>
        </>
      )}
    </div>
  );
}

export default TaskList;