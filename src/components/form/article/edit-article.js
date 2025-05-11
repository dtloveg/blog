import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchArticleBySlug, EditArticle } from '../../../store/slices/articleSlice'

import ArticleForm from './article-form'
import classes from './article-form.module.scss'

const EditArticles = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [dispatch, slug])
  const article = useSelector((state) => state.article.currentArticle)

  const onSubmit = async (data) => {
    const tagList = data.tags.filter((tag) => tag)
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagList,
    }
    console.log('Submitting article data:', articleData)
    const resultAction = await dispatch(EditArticle({ slug, articleData }))
    console.log('Result action:', resultAction)
    if (EditArticle.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  if (!article) {
    return <div>Loading...</div>
  }

  const defaultValues = {
    title: article.title,
    description: article.description,
    body: article.body,
    tags: article.tagList,
  }

  return (
    <main className={classes.main}>
      <ArticleForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </main>
  )
}

export default EditArticles
