import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CreateArticle } from '../../../store/slices/articleSlice'

import ArticleForm from './article-form'
import classes from './article-form.module.scss'

const CreateArticles = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const tagList = Array.isArray(data.tags) ? data.tags.filter((tag) => tag) : []
    const article = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagList,
    }
    console.log('Submitting article data:', article)
    const resultAction = await dispatch(CreateArticle(article))
    if (CreateArticle.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  return (
    <main className={classes.main}>
      <ArticleForm onSubmit={onSubmit} />
    </main>
  )
}

export default CreateArticles
