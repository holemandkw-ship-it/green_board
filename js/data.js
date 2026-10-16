const samplePost = {
    id: 1,
    title: "첫 번째 게시글",
    content: "게시판 실습중",
    author: "학생",
    createdDatetime: "2026-10-03"
};

let posts = [
    samplePost, 
    {...samplePost, id: 2, title: "HTML 문서 구조"},
    {...samplePost, id: 3, title: "학습 내용 정리"}
];

let comments = [
    {id: 1, boardId: 1, content: "첫댓글", author: "학생"},
    {id: 2, boardId: 1, content: "두 번째 댓글", author: "강사"}
];