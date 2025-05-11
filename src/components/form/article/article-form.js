import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { CreateArticle } from '../../../store/slices/articleSlice'

import classes from './article-form.module.scss'

const ArticleForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const resultAction = await dispatch(CreateArticle(data))
    if (CreateArticle.fulfilled.match(resultAction)) {
      navigate('/sign-in')
    }
  }

  return (
    <main className={classes.main}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={classes.form_fieldset}>
          <legend>Create new article</legend>
          <div className={classes.form_field}>
            <label className={classes.form_label}>Title</label>
            <input
              className={classes.form_input}
              type="text"
              {...register('title', {
                required: 'This field is required',
              })}
              placeholder="Title"
            />
          </div>
          <div className={classes.form_field}>
            <label className={classes.form_label}>Short description</label>
            <input
              className={classes.form_input}
              type="text"
              {...register('description', {
                required: 'This field is required',
              })}
              placeholder="Title"
            />
          </div>
<div className={classes.form_field}>
    <label className={classes.form_label}>Text</label>
    <textarea
        className={classes.form_textarea}
        {...register('body', {
            required: 'This field is required',
        })}
        placeholder="Text"
        rows={6} 
    />
</div>
          <ul className={classes.form_tags}>
            <button className={`${classes['form_button']} ${classes['form_button--add']}`}>Add tag</button>
          </ul>
        </fieldset>
        <button type="submit" className={`${classes['form_button']} ${classes['form_button--send']}`}>
          Send
        </button>
      </form>
    </main>
  )
}

export default ArticleForm
