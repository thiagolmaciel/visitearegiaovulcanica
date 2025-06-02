import React from 'react'
import SectionTitle from '../SectionTitle/page'
import SuggestionItem from '../SuggestionItem/page'

const SuggestionModel = (props) => {
  return (
    <div>
          <SectionTitle title={props.title}/>
          <div className="mt-2 flex flex-row gap-10">
          <SuggestionItem title="Fazenda" star="4.5"/>
          <SuggestionItem title="Fazenda" star="4.5"/>
          <SuggestionItem title="Fazenda" star="4.5"/>
          <SuggestionItem title="Fazenda" star="4.5"/>
          </div>
          </div>
  )
}

export default SuggestionModel
