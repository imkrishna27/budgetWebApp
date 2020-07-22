//class
class Budget
{
    constructor(budget)
    {
        this.budget=Number(budget)
        this.budgetleft=budget
    }

    //subtact from budget

    subbudget(amount)
    {
        return this.budgetleft-=amount
    }
}
// everything related to HTML
class HTML
{
    insertbudget(amount) 
    {

        budgetTotal.innerHTML=`${amount}`;
        budgetleft.innerHTML=`${amount}`;
    }

    printMessage(message,classname)
    {
        const messageWrapper=document.createElement('div');
        messageWrapper.classList.add('text-center','alert', classname);
        messageWrapper.appendChild(document.createTextNode(message));


        //inserting into html
        document.querySelector('.primary').insertBefore(messageWrapper,addexpence);
        setTimeout(function() 
        {
            document.querySelector('.primary .alert').remove();
            addexpence.reset();

        }
            ,3000);

        
    }

    addExpense(name,amount)
    {
        const expenseList=document.querySelector('#expenses ul');

        const li=document.createElement('li');
        li.className='list-group-item d-flex justify-content-between align-items-center';
        
        li.innerHTML=`
          ${name}   
          <span class='badge badge-primary badge-pill'>$ ${amount}</span>
        `;
        
        expenseList.appendChild(li);
    }

    trackbudget(amount)
    {
            const budgetleftindollers=budget.subbudget(amount);
            budgetleft.innerHTML=`${budgetleftindollers}`;


            //check for 25%
            if((budget.budget/4)>budgetleftindollers)
            {
                budgetleft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
                budgetleft.parentElement.parentElement.classList.add('alert-success','alert-danger');
            }
            //50%
            if((budget.budget/2)>budgetleftindollers)
            {
                budgetleft.parentElement.parentElement.classList.remove('alert-success');
                budgetleft.parentElement.parentElement.classList.add('alert-warning');
            }

            if (budgetleftindollers<=0)
            {
                html.printMessage('You are out of Money','alert-danger');
            }

    }

}

//variables
const addexpence=document.querySelector('#add-expense'),
budgetTotal=document.querySelector('span#total'),
budgetleft=document.querySelector('span#left');
   
let userbudget,budget;



const html=new HTML();

//eventlisteners
eventlisteners();

function eventlisteners()
{   

    //app init
    document.addEventListener('DOMContentLoaded',function()
    {
        userbudget=prompt("Enter Budget for this week");

        if(userbudget===null || userbudget==="" || userbudget==='0')
        {
            window.location.reload();
        }
        else
        {
            budget=new Budget(userbudget);
            console.log(budget);

            html.insertbudget(budget.budget);


        }
    });
    //when the new expense is added
    addexpence.addEventListener('submit',function(e)
    {

        e.preventDefault();

        const expensename=document.querySelector('#expense').value;
        const amount=document.querySelector('#amount').value;

        if(expensename===''||amount==='')
        {
            html.printMessage('All the fields are Mandetory','alert-danger')
        }
        else
        {
            html.addExpense(expensename,amount);
            html.trackbudget(amount);
            html.printMessage('Added','alert-success');
        }
    });
}