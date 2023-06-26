const empties = document.querySelectorAll('.empty')
let temp_id
let temp = []
const teams = [
  {
    name: 'John Doe',
    profession: 'Developer',
    icon: 'icon1.png',
    status: 'Active'
  },
  {
    name: 'Jane Smith',
    profession: 'Designer',
    icon: 'icon2.png',
    status: 'Active'
  },
  {
    name: 'Mike Johnson',
    profession: 'Project Manager',
    icon: 'icon3.png',
    status: 'Inactive'
  },
  {
    name: 'Sarah Williams',
    profession: 'Marketing Specialist',
    icon: 'icon4.png',
    status: 'Active'
  },
  {
    name: 'David Brown',
    profession: 'QA Engineer',
    icon: 'icon5.png',
    status: 'Active'
  },
  {
    name: 'Emily Davis',
    profession: 'Data Analyst',
    icon: 'icon6.png',
    status: 'Active'
  },
  {
    name: 'Michael Clark',
    profession: 'Business Analyst',
    icon: 'icon7.png',
    status: 'Inactive'
  },
  {
    name: 'Olivia Taylor',
    profession: 'Content Writer',
    icon: 'icon8.png',
    status: 'Active'
  },
  {
    name: 'Daniel Wilson',
    profession: 'UX/UI Designer',
    icon: 'icon9.png',
    status: 'Active'
  },
  {
    name: 'Sophia Lee',
    profession: 'Product Manager',
    icon: 'icon10.png',
    status: 'Active'
  }
]
 

let modalBtn = document.querySelector('.create')
let createButton = document.querySelector('.create')
let modal = document.querySelector('#modal')
let closeButton = document.querySelector('.close')
let taskForm = document.querySelector('#task-form')
let teamMembersSelect = document.querySelector('#team-members')
let taskStatusSelect = document.querySelector('#task-status')

let newItem = document.querySelector('new')

createButton.onclick = () => {
  modal.style.display = 'block'
}

closeButton.onclick = () => {
  modal.style.display = 'none'
}

taskForm.addEventListener('submit', function (elem) {
  elem.preventDefault()

  let taskName = document.querySelector('#task-name').value
  let taskDescription = document.querySelector('#task-description').value
  let teamMembers = Array.from(teamMembersSelect.selectedOptions).map(option => option.value)
  let taskStatus = taskStatusSelect.value
  let taskDeadline = document.querySelector('#task-deadline').value

  let task = {
    name: taskName,
    description: taskDescription,
    members: teamMembers,
    icon: teams.icon,
    status: taskStatus,
    deadline: taskDeadline
  }

  addItem(task)
  modal.style.display = 'none'
  taskName.value = ''
  taskDescription.value = ''
  taskStatusSelect.selectedIndex = 0
  teamMembersSelect.selectedIndex = 0
  taskDeadline.value = ''
})

teams.forEach(function (team) {
  let memberOption = document.createElement('option')
  memberOption.value = team.name
  memberOption.innerHTML = team.name
  teamMembersSelect.append(memberOption)
})

// const getSelectedMembers = (teams) => {
//   var selectElement = document.getElementById("teamMembersSelect");
//   var selectedMembers = Array.from(selectElement.selectedOptions).map(option => option.value);
  
//   var selectedTeamMembers = teams.filter(member => selectedMembers.includes(member.name));

//   selectedTeamMembers.forEach(member => {
//     var selectedIcon = member.icon;
//     console.log("Выбранный участник команды:", member.name);
//     console.log("Иконка:", selectedIcon);
//   });
// };


function addItem(task) {
  let div = document.createElement('div')
  let h3 = document.createElement('h3')
  let p_des = document.createElement('p')
  let div_bottom = document.createElement('div')
  let p_dline = document.createElement('p')
  let span_dl = document.createElement('span')
  let img_dl = document.createElement('img')
  let p_who = document.createElement('p')
  let img_icon = document.createElement('img')


  div.classList.add('items')
  div.setAttribute('class', 'items')
  div.setAttribute('draggable', true)

  div_bottom.classList.add('bottom_item')
  p_dline.classList.add('deadline')
  if(task.deadline === ''){
    img_dl = ''
  }else {
    img_dl.src = "icons/deadline.png"
  }
  
  span_dl.innerHTML = task.deadline
  h3.innerHTML = task.name
  p_des.innerHTML = task.description
  

  if(task.members ){
    img_icon.src = `icons/${teams.icon}`
    
  }

  if (task.status === 'To do') {
    empties[0].append(div)
  } else if (task.status === 'Doing') {
    empties[1].append(div)
  } else {
    empties[2].append(div)
  }

  div.append(h3, p_des, div_bottom)
  div_bottom.append(p_dline, p_who )
  p_dline.append(img_dl, span_dl)
  p_who.append(img_icon)

  temp.push(div)

  for (let empty of empties) {
    div.ondragstart = function (event) {
      // event.preventDefault()
      this.classList.add('is-dragging')
    }

    empty.ondragover = (event) => {
      event.preventDefault()
    }

    empty.ondrop = function (event) {
      event.preventDefault()
    
      let item = document.querySelector('.is-dragging')
      this.appendChild(item)
      item.classList.remove('is-dragging')
    }

  }
}






