const postComment = async (id, username, comment) => {
  const commentsUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YkOvPYHKCkzwzPHkcOz4/comments';
  await fetch(`${commentsUrl}`,
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
};

export default postComment;