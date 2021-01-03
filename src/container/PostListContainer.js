import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { getPosts, delRow, addRow, sort, search } from "../modules/post";
import { debounce } from "lodash";

function PostListContainer() {
  const dispatch = useDispatch();

  const onDelete = useCallback(index => {
    dispatch(delRow(index)
    )
  }, [dispatch]);

  const onCreate = useCallback(obj => {
    dispatch(addRow(obj))
  }, [dispatch]);

  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const { type } = useSelector((state) => state.posts.sortobj)

  const onSort = useCallback(key => {
    dispatch(sort({
      key: key,
      type: type === "" ? "up" : type === "up" ? 'down' : 'up'
    }))
  })

  const [input, setInput] = useState('')
  const onInputChanged = e => {
    const value = e.target.value;
    setInput(value);
    debounceSearch(value);
  };

  const debounceSearch = debounce((value) => {
    dispatch(search(value))
  }, 2000);

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <div className="container">
    <input className="input" placeholder="검색어를 입력하세요" value={input} onChange={onInputChanged} />
    <p>*테이블 헤더를 누르면 오름차순/내림차순으로 정렬됩니다.</p>
    <PostList posts={data} onCreate={onCreate} onDelete={onDelete} onSort={onSort} />
    </div>
  )
}

export default PostListContainer;
