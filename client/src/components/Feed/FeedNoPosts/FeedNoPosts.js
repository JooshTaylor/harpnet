import React from 'react'
import FeedAddPosts from '../FeedAddPosts'
import SuggestedFollowsList from '../../Suggestions/SuggestedFollowsList/SuggestedFollowsList'
import '../Feed.css'

export default function FeedNoPosts() {
  return (
    <div className="view__no-following">
      <div className="feed__container--left fcl-nopost">
        <FeedAddPosts />
        <h1 className="view__heading-1">
          Uh Oh! It looks like you haven't followed anybody yet
        </h1>
        <div className="view__box">
          <h2 className="view__heading-2">
            Search for other users to follow in the searchbar! Hint: there
            aren't very many users so just search for 'A'.
          </h2>
        </div>
      </div>
      <SuggestedFollowsList />
    </div>
  )
}
