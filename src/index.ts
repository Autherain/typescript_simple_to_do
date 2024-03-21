import { stringify, v4 as uuidV4 } from "uuid"


type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

console.log(uuidV4())

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

const array_task: Task[] = load_task()
array_task.forEach(add_list_item)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const new_task: Task = {
    id: uuidV4(),
    title: input?.value,
    completed: false,
    createdAt: new Date(),
  }
  array_task.push(new_task)
  save_task(array_task)

  add_list_item(new_task)

  input.value = ""
})

function add_list_item(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    save_task(array_task)
  })

  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function save_task(array_task: Task[]) {
  localStorage.setItem("TASKS", JSON.stringify(array_task))
}

function load_task(): Task[] {
  const getted_task = localStorage.getItem("TASKS")
  if (getted_task == null) return []
  return JSON.parse(getted_task)
}
