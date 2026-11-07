// jQuery for UI Interactions and Animations

$(document).ready(function() {
    
    // Function to render tasks to the DOM
    function renderTasks() {
        const $taskList = $('#taskList');
        $taskList.empty(); // Clear current list

        const tasks = taskManager.getAllTasks();

        if (tasks.length === 0) {
            $('#emptyState').show();
        } else {
            $('#emptyState').hide();
            
            $.each(tasks, function(index, task) {
                // Create task element
                const completedClass = task.completed ? 'completed' : '';
                const $li = $('<li></li>')
                    .addClass('task-item')
                    .attr('data-id', task.id)
                    .hide(); // Hide initially for fade-in animation

                const $span = $('<span></span>')
                    .addClass('task-text ' + completedClass)
                    .text(task.text);

                const $btn = $('<button></button>')
                    .addClass('delete-btn')
                    .text('Delete');

                $li.append($span).append($btn);
                $taskList.append($li);
                
                // jQuery Animation: Fade in new tasks
                $li.fadeIn(300);
            });
        }
    }

    // Initial render on page load
    renderTasks();

    // Event: Add Task (Button Click)
    $('#addTaskBtn').on('click', function() {
        addNewTask();
    });

    // Event: Add Task (Pressing 'Enter' key)
    $('#taskInput').on('keypress', function(e) {
        if (e.which === 13) {
            addNewTask();
        }
    });

    function addNewTask() {
        const taskText = $('#taskInput').val().trim();
        
        if (taskText !== '') {
            taskManager.addTask(taskText);
            $('#taskInput').val(''); // Clear input
            renderTasks();
            
            // jQuery Animation: Highlight the input briefly
            $('#taskInput').css('background-color', '#d4edda').animate({backgroundColor: '#ffffff'}, 500);
        } else {
            // Shake animation for empty input
            $('#taskInput').effect("shake", { times: 2 }, 300); // Note: requires jQuery UI for .effect(), 
            // Fallback without jQuery UI:
            $('#taskInput').css('border-color', 'red');
            setTimeout(() => $('#taskInput').css('border-color', '#ddd'), 1000);
        }
    }

    // Event: Toggle Task Completion (Clicking the text)
    // Using event delegation for dynamically created elements
    $('#taskList').on('click', '.task-text', function() {
        const $li = $(this).closest('.task-item');
        const taskId = parseInt($li.attr('data-id'));
        
        taskManager.toggleTask(taskId);
        renderTasks();
    });

    // Event: Delete Task (Clicking the delete button)
    $('#taskList').on('click', '.delete-btn', function() {
        const $li = $(this).closest('.task-item');
        const taskId = parseInt($li.attr('data-id'));
        
        // jQuery Animation: Fade out before removing
        $li.fadeOut(300, function() {
            taskManager.deleteTask(taskId);
            renderTasks();
        });
    });

});
