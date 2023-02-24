import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

export default async function subscribe(req, res) {
    const { email } = req.body;
    console.log(process.env.MAILCHIMP_AUDIENCE_ID);

    try {
        const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
            email_address: email,
            status: "subscribed",
        });

        console.log("Response status code:", response.status);
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);

        res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error response:", error.response);
        console.log("Error status code:", error.status);

        console.error("Mailchimp API error:", error);

        res.status(error.status).json({ success: false, error: error.message });
    }

    // Send a response for the "subscribed" status code
    // if (response.status === "subscribed") {
    //     res.status(200).json({ success: true });
    // }
}
