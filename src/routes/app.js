const express = require('express')
const Employee = require('../model/Employee')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('manemployee', {
    perform: {
      action: '/employee',
      button: 'Register',
      title: 'Register Employee',
    },
    employee: {},
  })
})

router.get('/update-employee', async (req, res) => {
  const { _id } = req.query
  try {
    if (!_id) {
      throw new Error('Manual modification because you was tried to modify url')
    }
    let employee = await Employee.findById({ _id })

    res.render('manemployee', {
      perform: {
        method: 'PATCH',
        action: `/employee/${employee._id}`,
        button: 'Update Employee',
        title: 'Update Employee here !!!',
      },
      employee,
    })
  } catch (error) {
    req.session.message = {
      type: 'danger',
      intro: `${error.message}`,
      message: ' please try again',
    }
    res.redirect('/employee')
  }
})

router.get('/employee', async (req, res) => {
  try {
    const employees = await Employee.find({})

    res.render('employee', { employee: employees })
  } catch (error) {
    req.session.message = {
      type: 'success',
      intro: `Something went wrong`,
      message: ' please try again',
    }
    res.redirect('/employee')
  }
})

router.post('/employee', async (req, res) => {
  const expectedEmployeeDetails = [
    'fname',
    'lname',
    'email',
    'phone',
    'salary',
    'dob',
    'nationality',
    'zipCode',
    'position',
    'gender',
  ]

  const isFullDetails = expectedEmployeeDetails.every((details) =>
    Object.keys(req.body).includes(details)
  )

  if (!isFullDetails) {
    req.session.message = {
      type: 'danger',
      intro: `Validation Error`,
      message: 'Missing some required information',
    }
    return res.redirect('/')
  }

  const employee = new Employee({
    ...req.body,
  })

  const isExistingEmployee = await Employee.findOne({ email: req.body.email })
  if (isExistingEmployee) {
    req.session.message = {
      type: 'danger',
      intro: `Employee Already exist with this email ${employee.email}`,
    }
    return res.redirect('/')
  }
  try {
    await employee.save()
    res.redirect('/employee')
  } catch (error) {
    req.session.message = {
      type: 'danger',
      intro: `Something went wrong`,
      message: ' please try again',
    }
    res.redirect('/')
  }
})

router.get('/delete-employee', async (req, res) => {
  const { _id } = req.query

  try {
    await Employee.findByIdAndDelete({ _id })
    req.session.message = {
      type: 'success',
      intro: `Employee deleted Successfull`,
    }
    res.redirect('/employee')
  } catch (error) {
    req.session.message = {
      type: 'danger',
      intro: `${error.message}`,
      message: ' please try again',
    }
    res.redirect('/')
  }
})

router.post('/employee/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    let employee = await Employee.findById({ _id })

    Object.keys(req.body).forEach(
      (update) => (employee[update] = req.body[update])
    )

    await employee.save()
    req.session.message = {
      type: 'success',
      intro: `Employee updated Successfull`,
    }
    res.redirect('/employee')
  } catch (error) {
    req.session.message = {
      type: 'danger',
      intro: `${error.message}`,
      message: ' please try again',
    }
    res.redirect('/employee')
  }
})

router.get('/*', (req, res) => {
  res.render('page404')
})
module.exports = router
