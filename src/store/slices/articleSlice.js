import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseUrl = 'https://blog-platform.kata.academy/api'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ page = 1, pageSize = 5 }) => {
  const offset = (page - 1) * pageSize
  const response = await fetch(`${baseUrl}/articles?limit=${pageSize}&offset=${offset}`)
  if (!response.ok) {
    throw new Error('Ошибка при получении статей: ' + response.statusText)
  }
  const articlesData = await response.json()
  return {
    articles: articlesData.articles,
    articlesCount: articlesData.articlesCount,
  }
})

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  status: null,
  error: null,
  isLoading: true,
}

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload // Редюсер для изменения текущей страницы
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.isLoading = false
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
        state.isLoading = false
      })
  },
})
export const { setCurrentPage } = articleSlice.actions
export default articleSlice.reducer
