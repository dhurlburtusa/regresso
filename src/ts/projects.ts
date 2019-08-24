const projects = {
  carpentry: {
    emoji: '🔨',
    cost: {
      wood: 10,
      food: 10,
      people: 4,
      days: 2,
    },
    description: 'Recycle and process wood more efficiently (+1 wood per day)'
  },
  fishing: {
    emoji: '🎣',
    cost: {
      wood: 10,
      food: 10,
      people: 4,
      days: 2,
    },
    description: 'Develop fishing tools (+5 food per day)',
  },
  shipyard: {
    emoji: '⚓',
    requires: [
      'carpentry'
    ],
    cost: {
      wood: 100,
      food: 10,
      people: 5,
      days: 7
    },
    description: 'Build a shipyard where boats and ships can be built.'
  },
  high_sea_fishing: {
    emoji: '⛵️',
    requires: [
      'shipyard',
      'fishing'
    ],
    cost: {
      wood: 25,
      food: 10,
      people: 5,
      days: 5
    },
    description: 'Build a fishing boat, bringing 10 extra food per day.'
  }

}

const createProjects = () => {
  const container = $('.projects')
  Object.keys(projects).forEach(key => {
    const newProject = $$('div', 'project', null)
    newProject.id = key
    const icon = $$('div', 'icon', projects[key].emoji)
    const title = $$('div', 'title', key.replace(/_/g, ' '))
    const description = $$('div', 'description', projects[key].description)
    newProject.append(icon)
    newProject.append(title)
    newProject.append(description)
    container.append(newProject)
    on(newProject, 'click', selectProject(key))
  })
}

const selectProject = (projectName) => () => {
  const project = projects[projectName]
  if (project.done) {
    return
  }
  
  project.done = true
  const $project = $(`.project#${projectName}`)
  const duration = project.cost.days * DAY
  $project.style.transition = `height ${duration}ms linear`
  $project.classList.add('in-progress')

  setTimeout(() => {
    log(`Project ${projectName.toUpperCase()} has has been completed`, 'blue', project.emoji)
    $project.classList.add('done')
    $project.classList.remove('in-progress')
    $project.style.transition = null
  }, duration)
}