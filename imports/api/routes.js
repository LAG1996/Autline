FlowRouter.route('/', {
	name: 'index',
	action(){
		BlazeLayout.render('show_page', {main: 'splash_page'})
	}
})

FlowRouter.route("/views/story_edit.html", {
	name: "story_edit",
	action(){
		BlazeLayout.render("show_page", {main: "story_edit_root"})
	}
})