import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import LoginPage from '../../pages/login-page'
import HomePage from '../../pages/home-page'
import RegisterPage from '../../pages/register-page'
import { fetchArticles } from '../../store/slices/articleSlice'
import ArticlesList from '../article-list'
import Paginations from '../pagination/pagination'

import classes from './app.module.scss'

function App() {
  const articlesCount = useSelector((state) => state.article.articlesCount)
  const currentPage = useSelector((state) => state.article.currentPage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage }))
  }, [dispatch, currentPage])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <main className={classes.main}>
        <ArticlesList />
        <Paginations articlesCount={articlesCount} />
      </main>
    </>
  )
}

export default App
